"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calculator,
  Plus,
  Trash2,
  Lock,
  Edit,
  TrendingUp,
  TrendingDown,
  Info,
  DollarSign,
  Check,
  X,
  FileText,
  Layers,
  ArrowLeft
} from "lucide-react"

// Interface for Row Data
interface EcomRow {
  name: string
  model: "ecom" | "drop"
  price: string
  upo: string
  cogs: string
  shipping: string
  overhead: string
  cancelPct: string
  returnFromConf: string
  tRoas: string
  stock: string

  // Calculated fields (Added by calculateRow)
  confirmRate?: number
  returnPct?: number
  deliveryRate?: number
  totalCost?: number
  merchantProfit?: number | null
  aov?: number
  beCps?: number
  beRoas?: number
  tCps?: number
  netProfit?: number
  totalProfit?: number
}

// Columns definition interface
interface ColDefinition {
  k: keyof EcomRow | string
  label: string
  dropLabel?: string
  type: "text" | "number"
  derived: boolean
  grp: "cost" | "prof"
  help: string
  ecomOnly?: boolean
  dropOnly?: boolean
}

const STORAGE_KEY = "calc_pricing_rows"
const MODEL_STORAGE_KEY = "calc_pricing_model"
const VIEW_STORAGE_KEY = "calc_pricing_view"

// Presets data matching the original calculator
const DEMO_ROWS: EcomRow[] = [
  {
    name: "مثال ①: منتج رابح (إيكوم)",
    model: "ecom",
    stock: "100",
    cogs: "120",
    shipping: "65",
    cancelPct: "15",
    overhead: "4",
    price: "399",
    upo: "1",
    tRoas: "4.2",
    returnFromConf: "28"
  },
  {
    name: "مثال ②: منتج رابح — سعر أعلى (إيكوم)",
    model: "ecom",
    stock: "60",
    cogs: "180",
    shipping: "65",
    cancelPct: "12",
    overhead: "4",
    price: "599",
    upo: "1",
    tRoas: "3.4",
    returnFromConf: "22"
  },
  {
    name: "مثال ③: منتج خاسر (إيكوم)",
    model: "ecom",
    stock: "25",
    cogs: "110",
    shipping: "65",
    cancelPct: "25",
    overhead: "4",
    price: "249",
    upo: "1",
    tRoas: "3",
    returnFromConf: "40"
  },
  {
    name: "مثال ④: دروبشيبينج رابح",
    model: "drop",
    stock: "50",
    cogs: "130",
    shipping: "",
    cancelPct: "20",
    overhead: "0",
    price: "199",
    upo: "1",
    tRoas: "6.5",
    returnFromConf: "35"
  }
]

const PR_COLS: ColDefinition[] = [
  {
    k: "name",
    label: "المنتج",
    type: "text",
    derived: false,
    grp: "cost",
    help: "اسمه، عشان تفرّق بين صفوفك."
  },
  {
    k: "price",
    label: "Price (سعر البيع)",
    dropLabel: "سعر البيع",
    type: "number",
    derived: false,
    grp: "cost",
    help: "السعر اللي العميل بيدفعه في القطعة الواحدة."
  },
  {
    k: "upo",
    label: "UPO (قطع/طلب)",
    type: "number",
    derived: false,
    grp: "cost",
    help: "متوسط عدد القطع في الطلب الواحد. لو كل عميل بياخد قطعة واحدة سيبها 1."
  },
  {
    k: "cogs",
    label: "COGs (تكلفة القطعة)",
    dropLabel: "تكلفة المورّد",
    type: "number",
    derived: false,
    grp: "cost",
    help: "اللي المنتج بيكلّفك فيه. في الإيكوم = سعر شرا القطعة، وفي الدروب = اللي بتدفعه للمورّد."
  },
  {
    k: "merchantProfit",
    label: "ربحك/قطعة",
    type: "number",
    derived: true,
    grp: "cost",
    dropOnly: true,
    help: "في الدروب بس: سعر البيع ناقص تكلفة المورّد."
  },
  {
    k: "shipping",
    label: "Shipping (الشحن)",
    type: "number",
    derived: false,
    grp: "cost",
    ecomOnly: true,
    help: "تكلفة شحن الطلب الواحد. الحاسبة بتحمّلك شحن المرتجع كمان، لأن الطلب اللي بيرجع بتدفع شحنه مرتين."
  },
  {
    k: "overhead",
    label: "Overhead (المصاريف)",
    type: "number",
    derived: false,
    grp: "cost",
    help: "نصيب الطلب الواحد من مصاريفك الثابتة: إيجار، مرتبات، تغليف. لو مش حاسبها حطّ رقم تقريبي بدل ما تسيبها صفر."
  },
  {
    k: "cancelPct",
    label: "Cancel % (نسبة الإلغاء)",
    type: "number",
    derived: false,
    grp: "cost",
    help: "من كل 100 طلب، كام واحد بيقع قبل ما يتشحن: مردّش، رفض، مكرر، عنوان ناقص."
  },
  {
    k: "returnFromConf",
    label: "% مرتجع/مؤكد",
    type: "number",
    derived: false,
    grp: "cost",
    help: "من الطلبات اللي اتأكدت واتشحنت فعلاً، كام رجعلك تاني. مش من كل الطلبات — من المؤكد بس."
  },
  {
    k: "confirmRate",
    label: "% التأكيد",
    type: "number",
    derived: true,
    grp: "cost",
    help: "نسبة الطلبات اللي بتعدّي التأكيد وبتوصل للشحن = 100 ناقص نسبة الإلغاء."
  },
  {
    k: "returnPct",
    label: "Return % (المرتجع الكلي)",
    type: "number",
    derived: true,
    grp: "cost",
    help: "المرتجع منسوب لكل الطلبات مش للمؤكد بس — فبيطلع أقل من اللي كتبته، وده طبيعي."
  },
  {
    k: "deliveryRate",
    label: "% التسليم",
    type: "number",
    derived: true,
    grp: "cost",
    help: "نسبة اللي وصل للعميل وقبضت فلوسه فعلاً. أهم رقم في الجدول — هو اللي بيحدد كام طلب لازم تخسر عشان تكسب واحد."
  },
  {
    k: "totalCost",
    label: "Total Cost (تكلفة الطلب)",
    type: "number",
    derived: true,
    grp: "cost",
    help: "تكلفة الطلب الواحد كاملة: البضاعة + الشحن (ومعاه شحن المرتجع) + المصاريف."
  },
  {
    k: "beCps",
    label: "BE CPS (تعادل الطلب)",
    type: "number",
    derived: true,
    grp: "cost",
    help: "أقصى فلوس تقدر تدفعها في الإعلان عشان تجيب طلب واحد وتخرج متعادل. قارنه بتكلفة النتيجة في مدير الإعلانات — لو بتدفع أكتر، إنت بتخسر."
  },
  {
    k: "beRoas",
    label: "BE ROAS (تعادل الـ ROAS)",
    type: "number",
    derived: true,
    grp: "cost",
    help: "نقطة تعادلك. الـROAS الفعلي فوقه = ربح، تحته = خسارة. نفس رقم BE CPS بس كنسبة."
  },
  {
    k: "tRoas",
    label: "tROAS (الـ ROAS الفعلي)",
    type: "number",
    derived: false,
    grp: "prof",
    help: "الرقم الوحيد اللي بتجيبه من مدير الإعلانات: العائد الفعلي على الإنفاق. أول ما تكتبه الصف بيقولك كسبان ولا خسران."
  },
  {
    k: "aov",
    label: "AOV (متوسط الطلب)",
    type: "number",
    derived: true,
    grp: "prof",
    help: "متوسط قيمة الطلب = السعر × متوسط قطع الطلب (UPO)."
  },
  {
    k: "tCps",
    label: "tCPS (التكلفة الفعلية)",
    type: "number",
    derived: true,
    grp: "prof",
    help: "تكلفة الطلب الفعلية عندك دلوقتي، محسوبة من الـtROAS اللي كتبته."
  },
  {
    k: "netProfit",
    label: "NET Profit (صافي الربح)",
    type: "number",
    derived: true,
    grp: "prof",
    help: "صافي ربحك من الطلب الواحد بعد كل التكاليف والإعلان. أخضر = بتكسب، أحمر = بتخسر."
  },
  {
    k: "stock",
    label: "Stock (الكمية)",
    dropLabel: "المُسلّم",
    type: "number",
    derived: false,
    grp: "prof",
    help: "عدد القطع اللي عايز تحسب عليها الإجمالي — اللي عندك في المخزن أو اللي متوقّع تبيعه."
  },
  {
    k: "totalProfit",
    label: "Total Profit (الإجمالي)",
    type: "number",
    derived: true,
    grp: "prof",
    help: "صافي ربح الطلب × الكمية = إجمالي ربحك من المنتج ده."
  }
]

const COMPACT_KEYS = [
  "name",
  "price",
  "upo",
  "cogs",
  "merchantProfit",
  "shipping",
  "overhead",
  "cancelPct",
  "returnFromConf",
  "deliveryRate",
  "beCps",
  "beRoas",
  "tRoas",
  "netProfit",
  "stock",
  "totalProfit"
]

// Helper calculation function
function calculateRow(r: EcomRow): EcomRow {
  const isDrop = r.model === "drop"
  const price = parseFloat(r.price) || 0
  const upo = parseFloat(r.upo) || 1
  const cogs = parseFloat(r.cogs) || 0
  const shipping = isDrop ? 0 : (parseFloat(r.shipping) || 0)
  const overhead = parseFloat(r.overhead) || 0
  const cancelPct = parseFloat(r.cancelPct) || 0
  const returnFromConf = parseFloat(r.returnFromConf) || 0
  const tRoas = parseFloat(r.tRoas) || 0
  const stock = parseFloat(r.stock) || 0

  const cancel = cancelPct / 100
  const rfc = returnFromConf / 100

  // Confirm Rate = 100 - Cancel %
  const confirmRate = (1 - cancel) * 100
  const cr = confirmRate / 100

  // Return % of total orders = Return from Confirmed * Confirm Rate
  const returnPct = rfc * cr * 100
  const ret = returnPct / 100

  // Delivery Rate = 100 - Cancel % - Return %
  let deliveryRate = (1 - cancel - ret) * 100
  if (deliveryRate < 0) deliveryRate = 0
  const dRate = deliveryRate / 100

  // Total Cost per order
  const totalCost = overhead + cogs * upo + (isDrop ? 0 : shipping * (1 + ret))

  // Merchant Profit for drop only
  const merchantProfit = isDrop ? price - cogs : null

  // AOV = UPO * Price
  const aov = upo * price

  // Break-even CPS (cost per sale) = (AOV - Total Cost) * Delivery Rate
  const beCps = (aov - totalCost) * dRate

  // Break-even ROAS = AOV / BE CPS
  const beRoas = beCps > 0 ? aov / beCps : 0

  // Target CPS = AOV / tROAS
  const tCps = tRoas > 0 ? aov / tRoas : 0

  // Net Profit = AOV - Total Cost - (dRate > 0 ? tCps / dRate : 0)
  const netProfit = aov - totalCost - (dRate > 0 ? tCps / dRate : 0)

  // Total Profit = Net Profit * Stock
  const totalProfit = netProfit * stock

  return {
    ...r,
    confirmRate,
    returnPct,
    deliveryRate,
    totalCost,
    merchantProfit,
    aov,
    beCps,
    beRoas,
    tCps,
    netProfit,
    totalProfit
  }
}

function getWinLose(r: EcomRow): "win" | "lose" | "" {
  const t = parseFloat(r.tRoas) || 0
  const be = r.beRoas || 0
  if (t <= 0 || be <= 0) return ""
  return t >= be ? "win" : "lose"
}

function formatValue(v: any, type: string): string {
  if (v === null || v === undefined || v === "") return "-"
  const n = typeof v === "number" ? v : parseFloat(String(v))
  if (isNaN(n)) return "-"
  if (type === "pct") return Math.round(n) + "%"
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

export default function EcommerceCalculatorClient() {
  const [rows, setRows] = useState<EcomRow[]>([])
  const [modelFilter, setModelFilter] = useState<"ecom" | "drop">("ecom")
  const [viewMode, setViewMode] = useState<"compact" | "full">("compact")
  const [profitFilter, setProfitFilter] = useState<"win" | "lose" | "">("")
  const [pendingDelete, setPendingDelete] = useState<number | null>(null)
  const [showGlossary, setShowGlossary] = useState(false)

  // Load from local storage
  useEffect(() => {
    const savedRows = localStorage.getItem(STORAGE_KEY)
    if (savedRows) {
      try {
        setRows(JSON.parse(savedRows))
      } catch (e) {
        setRows(DEMO_ROWS)
      }
    } else {
      setRows(DEMO_ROWS)
    }

    const savedModel = localStorage.getItem(MODEL_STORAGE_KEY)
    if (savedModel === "drop" || savedModel === "ecom") {
      setModelFilter(savedModel)
    }

    const savedView = localStorage.getItem(VIEW_STORAGE_KEY)
    if (savedView === "compact" || savedView === "full") {
      setViewMode(savedView)
    }
  }, [])

  // Sync to local storage
  const saveToStorage = (updatedRows: EcomRow[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRows))
  }

  // Calculate rows
  const calculatedRows = useMemo(() => {
    return rows.map(calculateRow)
  }, [rows])

  // Get active columns based on filters
  const activeCols = useMemo(() => {
    return PR_COLS.filter((c) => {
      if (viewMode === "compact" && !COMPACT_KEYS.includes(c.k as string)) return false
      if (c.dropOnly && modelFilter !== "drop") return false
      if (c.ecomOnly && modelFilter === "drop") return false
      return true
    })
  }, [viewMode, modelFilter])

  // Filter rows based on model and profit status
  const modelFilteredRows = useMemo(() => {
    return calculatedRows.map((r, i) => ({ r, originalIndex: i })).filter(({ r }) => r.model === modelFilter)
  }, [calculatedRows, modelFilter])

  const visibleRows = useMemo(() => {
    if (!profitFilter) return modelFilteredRows
    return modelFilteredRows.filter(({ r }) => getWinLose(r) === profitFilter)
  }, [modelFilteredRows, profitFilter])

  // Stats summaries
  const stats = useMemo(() => {
    let winCount = 0
    let loseCount = 0
    let totalProfitSum = 0
    let totalRated = 0

    modelFilteredRows.forEach(({ r }) => {
      const wl = getWinLose(r)
      if (wl === "win") winCount++
      else if (wl === "lose") loseCount++
      
      if (wl) totalRated++

      const tp = r.totalProfit || 0
      if (isFinite(tp)) {
        totalProfitSum += tp
      }
    })

    return {
      winCount,
      loseCount,
      totalProfitSum,
      totalRated
    }
  }, [modelFilteredRows])

  // Column Bulk Fill Action
  const handleBulkFill = (colKey: keyof EcomRow) => {
    const colName = PR_COLS.find((c) => c.k === colKey)?.label || colKey
    const val = prompt(`ادخل القيمة لتعميمها على عمود "${colName}" لكل المنتجات في التبويب الحالي (${modelFilteredRows.length} منتجات):`, "")
    if (val === null) return

    const updated = rows.map((r) => {
      if (r.model === modelFilter) {
        return { ...r, [colKey]: val.trim() }
      }
      return r
    })
    setRows(updated)
    saveToStorage(updated)
  }

  // Handle cell edits
  const handleCellChange = (index: number, key: keyof EcomRow, value: string) => {
    const updated = [...rows]
    updated[index] = { ...updated[index], [key]: value }
    setRows(updated)
    saveToStorage(updated)
  }

  // Add row
  const handleAddRow = () => {
    const newRow: EcomRow = {
      name: "",
      model: modelFilter,
      price: "",
      upo: "1",
      cogs: "",
      shipping: modelFilter === "ecom" ? "65" : "",
      overhead: "4",
      cancelPct: "15",
      returnFromConf: "20",
      tRoas: "",
      stock: ""
    }
    const updated = [...rows, newRow]
    setRows(updated)
    saveToStorage(updated)
    setPendingDelete(null)
  }

  // Add demo rows
  const handleAddDemo = () => {
    const updated = [...rows, ...DEMO_ROWS.filter((r) => r.model === modelFilter)]
    setRows(updated)
    saveToStorage(updated)
  }

  // Delete row
  const handleDeleteRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index)
    setRows(updated)
    saveToStorage(updated)
    setPendingDelete(null)
  }

  return (
    <div className="space-y-8 select-none" dir="rtl">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Calculator className="w-5 h-5" />
            </div>
            حاسبة التجارة الإلكترونية والتسعير
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            احسب تعادل الـ ROAS، وأقصى تكلفة طلب (BE CPS)، وصافي الأرباح الفعلية بناءً على نسبة الإلغاء والمرتجع.
          </p>
        </div>

        {/* Global Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Model Switcher */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl flex border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => {
                setModelFilter("ecom")
                localStorage.setItem(MODEL_STORAGE_KEY, "ecom")
                setProfitFilter("")
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                modelFilter === "ecom"
                  ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              ECOM (بضاعتي)
            </button>
            <button
              onClick={() => {
                setModelFilter("drop")
                localStorage.setItem(MODEL_STORAGE_KEY, "drop")
                setProfitFilter("")
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                modelFilter === "drop"
                  ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              DROP (دروبشيبينج)
            </button>
          </div>

          {/* View Switcher */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl flex border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => {
                setViewMode("compact")
                localStorage.setItem(VIEW_STORAGE_KEY, "compact")
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "compact"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500"
              }`}
            >
              مختصر
            </button>
            <button
              onClick={() => {
                setViewMode("full")
                localStorage.setItem(VIEW_STORAGE_KEY, "full")
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "full"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500"
              }`}
            >
              مفصّل
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Win Cards */}
        <button
          onClick={() => setProfitFilter(profitFilter === "win" ? "" : "win")}
          className={`flex items-center justify-between p-5 rounded-2xl border text-right transition-all hover:scale-[1.01] ${
            profitFilter === "win"
              ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/25"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 hover:border-emerald-300"
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">منتجات رابحة (Win)</span>
            <div className="text-3xl font-black flex items-baseline gap-2">
              {stats.winCount}
              <span className="text-xs font-medium text-zinc-400">
                من {stats.totalRated} مبيّنة
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </button>

        {/* Lose Cards */}
        <button
          onClick={() => setProfitFilter(profitFilter === "lose" ? "" : "lose")}
          className={`flex items-center justify-between p-5 rounded-2xl border text-right transition-all hover:scale-[1.01] ${
            profitFilter === "lose"
              ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500/25"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 hover:border-rose-300"
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">منتجات خاسرة (Lose)</span>
            <div className="text-3xl font-black flex items-baseline gap-2">
              {stats.loseCount}
              <span className="text-xs font-medium text-zinc-400">
                من {stats.totalRated} مبيّنة
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <TrendingDown className="w-6 h-6" />
          </div>
        </button>

        {/* Total Profit Card */}
        <div className="flex items-center justify-between p-5 rounded-2xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-right">
          <div className="space-y-1">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">إجمالي الأرباح المتوقعة</span>
            <div className={`text-3xl font-black ${
              stats.totalProfitSum >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}>
              {formatValue(stats.totalProfitSum, "num")}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Spreadsheet Container */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        
        {/* Table View Wrapper */}
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full text-sm border-collapse text-right">
            
            {/* Header groups */}
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/40 text-xs font-bold text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-3 text-right sticky right-0 bg-zinc-50 dark:bg-zinc-900 z-10 min-w-[140px] text-zinc-800 dark:text-zinc-200 font-extrabold shadow-[inset_-1px_0_0_#e4e4e7] dark:shadow-[inset_-1px_0_0_#27272a]" rowSpan={2}>
                  المنتج
                </th>
                <th className="p-2 text-center bg-blue-600/5 text-blue-600 dark:text-blue-400 border-l border-zinc-200 dark:border-zinc-800 font-black" colSpan={activeCols.filter(c => c.grp === "cost").length - 1}>
                  تحليل التكلفة والتسعير (Cost Analysis)
                </th>
                <th className="p-2 text-center bg-emerald-600/5 text-emerald-600 dark:text-emerald-400 font-black" colSpan={activeCols.filter(c => c.grp === "prof").length}>
                  تحليل الربحية والإعلانات (Profitability)
                </th>
                <th className="p-3 text-center min-w-[64px]" rowSpan={2}>حذف</th>
              </tr>

              <tr className="bg-zinc-50/50 dark:bg-zinc-800/20 text-xs font-bold text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                {activeCols.map((c) => {
                  if (c.k === "name") return null
                  const headerTitle = c.derived ? `${c.help}\n(محسوب تلقائياً — لا يمكن تعديله)` : c.help
                  return (
                    <th
                      key={c.k}
                      className={`p-3 text-center border-l border-zinc-100 dark:border-zinc-800/40 ${
                        c.derived ? "bg-amber-500/5 text-amber-600 dark:text-amber-400/90" : ""
                      }`}
                      title={headerTitle}
                    >
                      <div className="flex items-center justify-center gap-1.5 group">
                        <span>{c.derived ? "🔒 " : ""}{(modelFilter === "drop" && c.dropLabel) ? c.dropLabel : c.label}</span>
                        {!c.derived && rows.length > 0 && (
                          <button
                            onClick={() => handleBulkFill(c.k as keyof EcomRow)}
                            className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 transition-opacity p-0.5"
                            title="تعميم القيمة على كل المنتجات في هذا العمود"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={activeCols.length + 1} className="py-14 px-4 text-center">
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mx-auto">
                        <Info className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-zinc-800 dark:text-zinc-100">لا توجد منتجات مضافة بعد</h4>
                        <p className="text-xs text-zinc-500">ادخل بيانات منتجاتك أو حمّل مثالاً جاهزاً للبدء بالحساب مباشرة.</p>
                      </div>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={handleAddDemo}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                        >
                          🎯 تعبئة بأمثلة جاهزة
                        </button>
                        <button
                          onClick={handleAddRow}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all border border-zinc-200 dark:border-zinc-700"
                        >
                          ➕ إضافة منتج جديد
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                visibleRows.map(({ r, originalIndex }) => {
                  const wl = getWinLose(r)
                  const hasWarning = modelFilter === "ecom" && (parseFloat(r.price) > 0) && (parseFloat(r.shipping) <= 0)
                  
                  // Row border and bg highlights
                  const rowClass = 
                    pendingDelete === originalIndex
                      ? "bg-rose-500/10 dark:bg-rose-950/20 border-r-4 border-rose-500"
                      : wl === "win"
                      ? "bg-emerald-500/[0.03] dark:bg-emerald-500/[0.01] hover:bg-emerald-500/[0.06] border-r-4 border-emerald-500"
                      : wl === "lose"
                      ? "bg-rose-500/[0.03] dark:bg-rose-500/[0.01] hover:bg-rose-500/[0.06] border-r-4 border-rose-500"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/30 border-r-4 border-transparent"

                  return (
                    <tr
                      key={originalIndex}
                      className={`border-b border-zinc-100 dark:border-zinc-800/40 transition-colors ${rowClass}`}
                    >
                      {activeCols.map((c) => {
                        const cellVal = r[c.k as keyof EcomRow]
                        
                        // Render Product Name
                        if (c.k === "name") {
                          return (
                            <td key={c.k} className="p-2 text-right sticky right-0 bg-white dark:bg-zinc-900 z-10 shadow-[inset_-1px_0_0_#e4e4e7] dark:shadow-[inset_-1px_0_0_#27272a] min-w-[140px]">
                              <div className="flex items-center gap-2">
                                {/* Badges */}
                                {hasWarning && (
                                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[10px]" title="⚠️ الشحن فارغ! قد تكون حسابات التعادل متفائلة بشكل غير دقيق.">
                                    ⚠️
                                  </span>
                                )}
                                {wl === "win" && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-white leading-none">
                                    كسبان
                                  </span>
                                )}
                                {wl === "lose" && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-500 text-white leading-none">
                                    خسران
                                  </span>
                                )}
                                <input
                                  type="text"
                                  value={r.name}
                                  placeholder="اسم المنتج"
                                  onChange={(e) => handleCellChange(originalIndex, "name", e.target.value)}
                                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs font-bold outline-none focus:border-blue-500 text-right"
                                />
                              </div>
                            </td>
                          )
                        }

                        // Render Derived Output Cell
                        if (c.derived) {
                          let customColor = ""
                          if (c.k === "netProfit" || c.k === "totalProfit") {
                            customColor = (r.netProfit || 0) >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                          }

                          return (
                            <td key={c.k} className="p-2 text-center bg-amber-500/[0.02]">
                              <div className={`px-2 py-1.5 rounded-lg text-xs font-extrabold ${customColor || "text-amber-700 dark:text-amber-400"}`}>
                                {formatValue(cellVal, c.type === "number" ? "num" : c.k.includes("Rate") || c.k.includes("Pct") ? "pct" : "text")}
                              </div>
                            </td>
                          )
                        }

                        // Render User Editable Input Cell
                        return (
                          <td key={c.k} className="p-2 text-center">
                            <input
                              type="number"
                              step={c.k.includes("Pct") ? "1" : "0.1"}
                              value={cellVal as string}
                              onChange={(e) => handleCellChange(originalIndex, c.k as keyof EcomRow, e.target.value)}
                              className="w-20 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1.5 text-xs font-medium outline-none focus:border-blue-500 text-center"
                            />
                          </td>
                        )
                      })}

                      {/* Actions */}
                      <td className="p-2 text-center">
                        {pendingDelete === originalIndex ? (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleDeleteRow(originalIndex)}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-xs font-bold"
                            >
                              تأكيد
                            </button>
                            <button
                              onClick={() => setPendingDelete(null)}
                              className="p-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 rounded-md"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPendingDelete(originalIndex)}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-500/10 rounded-lg transition-colors mx-auto block"
                            title="حذف هذا المنتج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer controls & add button */}
        {visibleRows.length > 0 && (
          <div className="p-4 bg-zinc-50/50 dark:bg-zinc-800/20 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleAddRow}
              className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-zinc-700"
            >
              <Plus className="w-4 h-4" />
              إضافة منتج جديد للجدول
            </button>
            <div className="text-xs text-zinc-500 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>مبيّن حالياً: <b>{visibleRows.length}</b> منتجات من أصل <b>{modelFilteredRows.length}</b></span>
            </div>
          </div>
        )}
      </div>

      {/* Calculations & Glossary details */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowGlossary(!showGlossary)}
          className="w-full p-5 flex items-center justify-between font-bold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
        >
          <div className="flex items-center gap-2 text-base font-black">
            <FileText className="w-5 h-5 text-blue-600" />
            شرح المصطلحات والمعادلات — يعني إيه كل رقم؟
          </div>
          <span className="text-xs text-blue-600 font-bold hover:underline">
            {showGlossary ? "إغلاق الشرح ✕" : "عرض الشرح التفصيلي ←"}
          </span>
        </button>

        <AnimatePresence>
          {showGlossary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {/* Manual inputs descriptions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-amber-600 dark:text-amber-500 pb-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                    ✍️ أرقام تكتبها بنفسك
                  </h3>
                  <dl className="space-y-3">
                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">سعر البيع (Price)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">السعر النهائي الذي يدفعه العميل لشراء القطعة الواحدة شامل الضريبة.</dd>
                    
                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">COGs (تكلفة المنتج)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">تكلفة شراء أو توريد القطعة الواحدة من المورد أو المصنع.</dd>
                    
                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">الشحن (Shipping)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">تكلفة شحن الطرد للعميل. تقوم الحاسبة باحتساب شحن المرتجع تلقائياً لأنك تدفع رسوم الشحن عند الإرسال والاسترجاع.</dd>
                    
                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">نسبة الإلغاء (Cancel %)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">النسبة المئوية للطلبات التي تُلغى قبل خروجها للشحن (عدم رد العميل، تأكيد خاطئ، خطأ في العنوان).</dd>
                    
                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">% مرتجع/مؤكد (Return % / Confirmed)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">نسبة الطرود المرتجعة من إجمالي الطلبات التي تأكدت وشُحنت فعلياً.</dd>
                  </dl>
                </div>

                {/* Derived variables descriptions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-emerald-600 dark:text-emerald-500 pb-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                    🔒 أرقام تُحتسب تلقائياً
                  </h3>
                  <dl className="space-y-3">
                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">نسبة التسليم (% Delivery Rate)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">النسبة النهائية للطلبات المسلّمة بنجاح إلى إجمالي الطلبات الواردة. وهي النسبة الأهم لتحديد جدوى المنتج.</dd>

                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">تعادل الـ ROAS (BE ROAS)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">نقطة التعادل لعائد الإنفاق الإعلاني. تحقيق ROAS أعلى من هذا الرقم يعني تحقيق أرباح، وأقل منه يعني خسارة.</dd>

                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">BE CPS (تعادل تكلفة الطلب)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">أقصى تكلفة يمكن دفعها في مدير الإعلانات للحصول على طلب واحد دون تحقيق خسائر.</dd>

                    <dt className="font-bold text-zinc-800 dark:text-zinc-100 text-xs">صافي الربح (NET Profit)</dt>
                    <dd className="text-xs text-zinc-500 pr-2">الربح الصافي للطلب الواحد بعد احتساب تكلفة البضاعة، الشحن، المرتجع، التكاليف الثابتة، وتكلفة الإعلانات الفعلية.</dd>
                  </dl>
                </div>

                <div className="col-span-1 md:col-span-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                  <p className="font-bold text-zinc-700 dark:text-zinc-300 mb-1">الفرق الجوهري بين نمطي ECOM و DROP:</p>
                  في نمط <b>ECOM (بضاعتي)</b>، البضاعة ملكك وأنت من يتحمل كلف الشحن الكاملة ونسبة مرتجعات الشحن. في نمط <b>DROP (دروبشيبينج)</b>، يقوم المورد بشحن الطرد وتصفية الحساب معك، ولا تكلّفك المرتجعات شيئاً، لكن الهامش الربحي للقطعة يكون أضيق، لذا يتطلب الـ Break-Even ROAS قيمة أعلى للتعادل.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Tools Page Link */}
      <div className="flex justify-center pt-4">
        <a
          href="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة لصفحة جميع الأدوات</span>
        </a>
      </div>
    </div>
  )
}

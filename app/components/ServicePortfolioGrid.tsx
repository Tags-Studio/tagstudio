"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ImageModal from "./ImageModal"
import { getProjectsByServiceSlug, ProjectItem } from "@/lib/portfolioData"

interface Props {
  serviceSlug: string
  serviceTitle: string
}

export default function ServicePortfolioGrid({ serviceSlug, serviceTitle }: Props) {
  const projects = getProjectsByServiceSlug(serviceSlug)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (projects.length === 0) return null

  const openModal = (project: ProjectItem) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <section id="service-portfolio" className="py-20 border-t border-border bg-card/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-semibold text-primary">معرض الأعمال</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            نماذج أعمالنا في {serviceTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            استعرض التنوع والإتقان البصري في مشاريعنا المنجزة لعملائنا في السعودية ومصر.
          </p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-background rounded-3xl shadow-lg overflow-hidden border border-border/80 hover:border-primary/30 transition-all duration-300 group"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-sm font-semibold bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      تعديل ومعاينة الصورة 🔍
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1"
                    >
                      مشاهدة الفيديو على يوتيوب 🎥
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {isModalOpen && selectedProject && (
        <ImageModal
          imageUrl={selectedProject.imageUrl}
          title={selectedProject.title}
          isOpen={isModalOpen}
          onClose={closeModal}
          category={selectedProject.category}
          description={selectedProject.description}
          caseStudy={selectedProject.caseStudy}
        />
      )}
    </section>
  )
}

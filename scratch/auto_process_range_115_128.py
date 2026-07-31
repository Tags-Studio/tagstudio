import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from scratch.replace_v3_post import replace_post
from scratch.clean_all_leaks import clean_leaks

range_ids = list(range(115, 129))

for post_id in range_ids:
    print(f"\n--- Processing Post {post_id} ---")
    success = replace_post(post_id)
    if not success:
        print(f"Failed to replace post {post_id}")
    else:
        print(f"Successfully replaced post {post_id}")

print("\n--- Running clean_leaks ---")
clean_leaks()
print("\nRange processing complete!")

#!/bin/bash

# This script collects and concatenates the contents of relevant project files into a single output file.
# Place this script in the root directory of your project.
# Make it executable with: chmod +x copy_code.sh
# Run it with: ./copy_code.sh

# Define the project directory as the current working directory
project_dir=$(pwd)

# Define the output file
output_file="${project_dir}/code_context.txt"
temp_file="${output_file}.tmp"

# List of common directories to include
directories=("src" "lib" "include" "components" "pages" "app" "actions" "public" "scripts" "utils" "lib" "constants" "types")

# List of file patterns to ignore
ignore_patterns=("*.ico" "*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg" "*.bmp" "*.tiff" "*.mp3" "*.mp4" "*.avi" "*.mkv" "*.exe" "*.dll" "*.so" "*.dylib" "*.bin" "*.pdf" "*.doc" "*.docx" "*.xls" "*.xlsx")

# Remove existing output file if it exists
[ -f "$output_file" ] && rm "$output_file"

# Create or clear the temporary file
> "$temp_file"

# Construct the find command
find_cmd="find ${directories[@]} -type f"

# Add ignore patterns to the find command
for pattern in "${ignore_patterns[@]}"; do
  find_cmd+=" ! -name '$pattern'"
done

# Execute the find command and process files
eval "$find_cmd" -print0 | while IFS= read -r -d '' file; do
  relative_path="${file#$project_dir/}"
  echo "// File: $relative_path" >> "$temp_file"
  cat "$file" >> "$temp_file"
  echo "" >> "$temp_file"
done

# Move temporary file to final output file
mv "$temp_file" "$output_file"

echo "Code context has been written to $output_file"
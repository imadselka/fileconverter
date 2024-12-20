# File Converter

## Overview

The File Converter is a web application that allows users to convert their files to various formats for free. It leverages the CloudConvert API to handle the conversion process and provides a user-friendly interface for uploading and managing files.

## Table of Contents

- [File Converter](#file-converter)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Idea Behind the Project](#idea-behind-the-project)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [Code Structure](#code-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **File Upload**: Users can upload files by clicking or dragging and dropping them into the designated area.
- **File Conversion**: Supports conversion of various file formats including documents (pdf, doc, docx...) **DOESNT WORK FOR NOW AND I DONT THINK IT WILL** and media files **images / videos**.
- **Progress Tracking**: Users can track the conversion progress and download the converted files once the process is complete.
- **Error Handling**: Provides feedback in case of conversion failures and allows users to retry the conversion.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS

## Idea Behind the Project

I created the File Converter because I was frustrated with the existing file conversion websites. Most of them are either filled with annoying ads or require a paid subscription to access their services. I wanted a simple, ad-free solution that anyone could use without any hassle. 

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- CloudConvert API Key

### Steps

1. **Clone the repository**:

   ```sh
   git clone https://github.com/imadselka/fileconverter.git
   cd fileconverter
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your CloudConvert API key:

   ```env
   CLOUD_CONVERT_API_KEY=your_cloudconvert_api_key
   ```

4. **Run the development server**:

   ```sh
   npm run dev
   ```

5. **Open the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Upload a File**:

   - Click on the upload area or drag and drop your file.
   - The uploaded file will be displayed with its details.

2. **Select Conversion Format**:

   - Choose the desired output format from the dropdown menu.

3. **Convert the File**:

   - Click the "Convert" button to start the conversion process.
   - Wait for the conversion to complete.

4. **Download the Converted File**:

   - Once the conversion is done, click the "Download" button to save the converted file to your device.

## Code Structure

- **components**: Contains React components for the UI, including `Content`, `FileUpload`, and `AfterFileUploaded`.
- **utils**: Contains utility functions such as `cloudConvertService` for interacting with the CloudConvert API.

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

# Contributing to File Converter

Thank you for considering contributing to File Converter! We welcome all kinds of contributions, including bug fixes, feature enhancements, and documentation improvements.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- CloudConvert API Key

### Installation

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

## Code Structure

- **components**: Contains React components for the UI, including `Content`, `FileUpload`, and `AfterFileUploaded`.
- **app/api**: Contains the API route for handling file conversion requests.
- **utils**: Contains utility functions such as `cloudConvertService` for interacting with the CloudConvert API.

## Making Changes

### Fixing Errors

1. **Identify the error**: Check the console or logs for error messages.
2. **Locate the source**: Use the error message to find the relevant code.
3. **Fix the error**: Make the necessary changes to resolve the issue.
4. **Test your changes**: Ensure that your changes fix the error without introducing new issues.

### Refactoring Code

1. **Identify code to refactor**: Look for code that is difficult to read, maintain, or extend.
2. **Plan your refactor**: Determine how you will improve the code.
3. **Make the changes**: Refactor the code in small, incremental steps.
4. **Test your changes**: Ensure that your refactored code works as expected.

### Submitting Changes

1. **Create a new branch**:

   ```sh
   git checkout -b your-branch-name
   ```

2. **Commit your changes**:

   ```sh
   git add .
   git commit -m "Description of your changes"
   ```

3. **Push your branch**:

   ```sh
   git push origin your-branch-name
   ```

4. **Create a Pull Request**: Go to the repository on GitHub and create a pull request from your branch.

## Code Style

- Follow the existing code style and conventions.
- Use meaningful variable and function names.
- Write comments to explain complex logic.

## Testing

- Ensure that all existing tests pass.
- Write new tests for any new functionality.
- Run tests using:
  ```sh
  npm test
  ```

## Documentation

- Update the README.md file if your changes affect the usage or setup of the project.
- Add comments to your code where necessary.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to File Converter!

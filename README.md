# Jntuh-R22-Notes

This repository serves as the preview page for the [Server-Jntuh-R22-Notes](https://github.com/Harshrb2424/Server-Jntuh-R22-Notes) application. The live preview is accessible at [https://harshrb2424.github.io/Jntuh-R22-Notes/](https://harshrb2424.github.io/Jntuh-R22-Notes/).

## Preview Server-Jntuh-R22-Notes

[Server-Jntuh-R22-Notes](https://github.com/Harshrb2424/Server-Jntuh-R22-Notes) is a Node.js application built with Express and EJS, designed to dynamically display notes based on the data provided in `data.json`. The notes are linked from the `resources` folder, and the application allows for easy customization of the note list.

## Preview Features

- **Static GitHub Pages Hosting:** This repository is hosted on GitHub Pages, providing a convenient and accessible way to preview the Server-Jntuh-R22-Notes application.

- **Live Demo:** Visit [https://harshrb2424.github.io/Jntuh-R22-Notes/](https://harshrb2424.github.io/Jntuh-R22-Notes/) to interact with a live demonstration of the Server-Jntuh-R22-Notes application.

## How to Use the Preview

Simply navigate to [https://harshrb2424.github.io/Jntuh-R22-Notes/](https://harshrb2424.github.io/Jntuh-R22-Notes/) to explore the live preview of Server-Jntuh-R22-Notes. You can interact with the notes and experience the dynamic rendering of content.

## Contributing

If you encounter any issues or have suggestions for improvement, please feel free to open an [issue](https://github.com/Harshrb2424/Jntuh-R22-Notes/issues) in this repository.

### Adding PDFs for Notes

To contribute by adding new PDFs, follow these steps:

1. **Rename the PDF:**
   - Name the PDF file using the appropriate subject code and unit name.
   - Example: For "Mathematical Sciences Foundation" Unit 3, name the file as `MSF Unit3.pdf`.

2. **Organize Files:**
   - Place the renamed PDF in the appropriate folder:
     - Path: `public/resources/<year>/`
     - Example: `public/resources/2nd Year/MSF Unit3.pdf`.

3. **Update JSON Files:**
   - Locate the JSON file for the specific subject in `public/info`.
   - Example: For "MSF," find `public/info/MSF.json`.

4. **Add PDF Details:**
   - Update the `links` section in the JSON file with the new PDF name and link.
   - Use the following format:
     ```json
     "links": [
         {
             "name": "MSF Unit 1 Greatest Common Divisors And Prime Factorization And Congruences",
             "link": "./resources/2nd Year/MSF-Unit1.pdf"
         },
         {
             "name": "MSF Unit 2 Simple Linear Regression And Correlation",
             "link": "./resources/2nd Year/MSF-Unit2.pdf"
         },
         {
             "name": "MSF Unit 3 Advanced Number Theory",
             "link": "./resources/2nd Year/MSF-Unit3.pdf"
         }
     ]
     ```

5. **Save and Test:**
   - Ensure the JSON syntax is correct and matches the file structure.
   - Run the application locally or check the live preview to confirm the PDF is displayed correctly.

6. **Commit and Push:**
   - Commit the updated files and push them to the repository.
   - Provide a clear commit message like: `Added MSF Unit3.pdf to 2nd Year and updated MSF.json`.

By following these steps, you can easily contribute to the repository and help expand the available resources for JNTUH R22 Notes.

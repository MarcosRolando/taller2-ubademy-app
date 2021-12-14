import React from "react";
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const PDFCreator = () => {

  async function createPDF() {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    alert(file.filePath);
  }

}
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
const csv = require('csvtojson');
const FileSaver = require('file-saver');


export default class Hello extends Component {
  state = {
    files: []
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      files: acceptedFiles
    });

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileAsBinaryString = reader.result;

        csv({
          noheader: true,
          output: 'json'
        })
        .fromString(fileAsBinaryString)
        .then(csvRows => {
          const toJson = [];
          const headers = csvRows[0];
          for (let i = 1; i < csvRows.length; i++) {
            const aCsvRow = csvRows[i];
            const builtObject = {};
            Object.keys(aCsvRow).forEach((aKey, index) => {
              const valueToAddInBuiltObject = isNaN(aCsvRow[aKey])
                ? aCsvRow[aKey]
                : Number(aCsvRow[aKey]);
                const keyToAddInBuiltObject = headers[aKey].toLowerCase() === 'date' ? 'date' : headers[aKey];
              builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
            });
            toJson.push(builtObject);
          }
          this.props.onDrop(toJson);
        });
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsText(file);
    });
  };

  createExportFile = () => {
    const { files } = this.state;
    const jsonData = JSON.stringify(files, null, 2);
    const exportCode = `export const data = ${jsonData};`;
    console.log(jsonData)
    const blob = new Blob([exportCode], { type: 'text/javascript' });
    FileSaver.saveAs(blob, 'exportData.js');
  };

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Try dropping some files here, or click to select files to upload.</p>
              </div>
            )}
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>{f.name} - {f.size} bytes</li>
            ))}
          </ul>
        </aside>
        {/* <button onClick={this.createExportFile}>Create Export File</button> */}
      </section>
    );
  }
}

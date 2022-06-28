import React from "react";
import Dropzone from "react-dropzone";
import { AiFillPicture } from "react-icons/ai";

function ResourcesTab(props) {
    let resources = props.resources
    let setResources = props.setResources

    function onDrop(acceptedFiles) {
        var formData = new FormData();

        acceptedFiles.forEach(file => {
            formData.append('files[]', file);
        })

        fetch('api/upload', {
            method: 'POST',
            headers: {
                //'Content-type': 'application/json; charset=UTF-8'
            },
            // body: JSON.stringify(form)
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                resources.push(data)
                //setResources(resources)
                // if(data.success) {
                //     navigate('/message?d=postcreated')
                // } else {
                //     navigate('/message?d=postfail')
                // }
            })
    }



  return (
    <div className="resources">
      <Dropzone
        onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
        maxSize={10000000}
        multiple
        accept=".jpg, .png, .pdf, .csv, .tsv, .xlsx"
      >
        {({ getRootProps, getInputProps }) => (
          <section className="dropzone">
            <input {...getInputProps()} />
            <div {...getRootProps()}>
              <AiFillPicture />
              <p className="label">Drag Resources Here</p>
              <p className="upload">Or select from your computer...</p>
              <div className="req">
                <p>.jpg .png .pdf .csv .tsv .xlsx</p>
                <p>max file size: 10MB</p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default ResourcesTab;

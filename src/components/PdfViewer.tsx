import DocViewer,{IDocument} from '@cyntler/react-doc-viewer'
import React from 'react'
import "@cyntler/react-doc-viewer/dist/index.css";

function PdfViewer({documents}:{documents:Array<IDocument>}) {
  return (
    <div className='w-1/2 bg-white'>
        <DocViewer
        documents={documents}
        />
    </div>
  )
}

export default PdfViewer
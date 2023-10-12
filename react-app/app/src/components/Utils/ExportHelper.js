import ReactDOM from 'react-dom';
import {pullDataSimple, pullDataWithBody} from './RESTHelper.js';
import fileDownload from 'js-file-download'
import { MessageDialog } from '../Dialogs/MessageDialog.js';

export function exportFiles(ids, downloadLink, callback)
{
  function downloadCallback (res)
  {
    fileDownload(res.data, process.env.REACT_APP_URL_PROJECT_NAME+'_Export.zip');
    callback();
  }
  
  function errorCallback(err)
  {
    let content = (
    <div>
      <h3>Fehlermeldung:</h3>
      <h3 style={{color : 'red'}}>{err.stack.toString()}</h3>
    </div>);
    ReactDOM.render(<MessageDialog title="Etwas ist schief gelaufen..." content={content}/>, document.getElementById("portal"));
  }

  pullDataWithBody(downloadLink, 'blob', ids, downloadCallback, errorCallback);
}

export function downloadFileWithURl(downloadLink, downloadedFileName)
{
  function downloadCallback (res)
  {
    fileDownload(res.data, downloadedFileName);
  }

  pullDataSimple(downloadLink, downloadCallback);
}

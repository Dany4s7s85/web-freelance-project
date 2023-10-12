import axios from "axios";

export async function postData(url, dataToUpdate) {
  axios
    .post(url, dataToUpdate)
    .then((res) => {
      console.log("React-App: Data Update Succesfull");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function pullDataWithBody(url, responseType, bodyData, callback, errorCallback)
{
  const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    responseType: responseType,
    params: bodyData
  }

  axios.get(url, config)
  .then((res) => 
  {
    console.log("React-App: Data received");
    if(callback !== undefined)
      callback(res)
  })
  .catch((err) => {
    console.log(err);
    if(errorCallback !== undefined)
      errorCallback(err)
  });
}

export async function pullDataSimple(url, callback, errorCallback)
{
  axios.get(url)
  .then((res) => 
  {
    console.log("React-App: Data received");
    if(callback !== undefined)
      callback(res)
  })
  .catch((err) => {
    console.log(err);
    if(errorCallback !== undefined)
      errorCallback(err)
  });
}

export async function pullData({ url, pageIndex, pageSize, filter }, callback) {
  console.log("Fetch data");
  axios
    .post(url, {
      pageIndex,
      pageSize,
      filter,
    })
    .then((res) => {
      console.log("React-App: Data received");
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getUniqueData(url, data) {
  console.log("Data in the app ::", data);
  return axios.post(url, {
    column: data.column,
    value: data.value,
  });
}

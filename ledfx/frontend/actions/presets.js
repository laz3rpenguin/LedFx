import fetch from "cross-fetch";

const apiUrl = window.location.protocol + "//" + window.location.host + "/api";

export const ADD_PRESET = "ADD_PRESET"
export const REMOVE_PRESET = "REMOVE_PRESET"
export const SET_PRESET = "SET_PRESET"
export const GET_PRESETS = "GET_PRESETS"
export const ACTIVATE_PRESET = "ACTIVATE_PRESET"

export function addPreset(name) {
  return dispatch => {
    const data = {
      name: name
    };
    fetch(`${apiUrl}/presets`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch(receiveDevice(json)));
  };
}

export function deletePreset(id) {
  return dispatch => {
    const data = {
      id: id
    };
    fetch(`${apiUrl}/presets`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch(receiveDevice(json)));
  };
}

export function activatePreset(id) {
  return dispatch => {
    const data = {
      id: id,
      action: 'activate'
    };
    fetch(`${apiUrl}/presets`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: ACTIVATE_PRESET,
        response: json
      }));
  };
}


export function getPresets() {
  return dispatch => {
    fetch(`${apiUrl}/presets`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => dispatch({
          type: GET_PRESETS,
          presets: json.presets,
          receivedAt: Date.now()
      }))
  }
}

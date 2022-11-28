import React from "react";
import isLoading from "./IsLoading.module.css"

export default () =>{
    return (
        <div className={isLoading["spinner-container"]}>
          <div className={isLoading["loading-spinner"]}>
          </div>
        </div>
      );
}
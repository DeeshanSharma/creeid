import React from "react";

function ShowAlert(props) {
	return <p style={{ position: "absolute", top: "0", left: "0", marginBottom: "10px", width: "100%", textAlign: "center" }}>{props.alertMsg}</p>;
}

export default ShowAlert;

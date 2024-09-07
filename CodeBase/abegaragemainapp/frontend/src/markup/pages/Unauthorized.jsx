import React from "react";

function Unauthorized() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "50vh",
				backgroundColor: "#ccc",
			}}
		>
			<h1
				style={{
					color: "darkred",
					fontSize: "30px",
					textAlign: "center",
				}}
			>
				Sorry, You don't have the authorization to access the page you requested
			</h1>
		</div>
	);
}

export default Unauthorized;

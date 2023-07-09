import React from "react";

function page({ params }: any) {
  return <div>Dynamic page : {params.id}</div>;
}

export default page;

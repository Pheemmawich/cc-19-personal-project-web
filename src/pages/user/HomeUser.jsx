import React from "react";
import Recommend from "../../components/guest/Recommend";
import Creator from "../../components/guest/Creator";
import GenerateMenu from "../../components/guest/GenerateMenu";

function HomeUser() {
  return (
    // <div className='flex justify-between'>
    //   <GenerateMenu/>
    //   <Recommend/>
    //   <Creator/>
    // </div>
    <div className="flex justify-between">
      <GenerateMenu />
      <Recommend />
      <Creator />
    </div>
  );
}

export default HomeUser;

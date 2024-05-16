import React from "react";

const NoDataPage = ({ domain, subdomain = null, height=null }) => {
  return (
    <>
      <div className={`flex items-center justify-center ${height ? height : "h-[10rem]"}` }>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-600">{domain}</h2>
          <p className="text-gray-500">{subdomain ? subdomain : "Sorry, there is no data to display."}</p>
        </div>
      </div>
    </>
  );
};

export default NoDataPage;

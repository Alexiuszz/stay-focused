import Layout from "@/components/layout";
import React from "react";

function Settings() {
  return (
    <Layout
      page="settings"
      onClick={() => {
        return;
      }}
    >
      <section className="m-auto mr-16 w-full md:w-11/12 lg:w-3/4 h-[80vh] flex flex-col items-center gap-4">
        <div className="flex w-11/12 md:w-full h-fit mx-auto md:mx-0">
          <h1 className="text-xl mb-1 ml-4 md:ml-0 ">
            Settings
          </h1>
        </div>
      </section>
    </Layout>
  );
}

export default Settings;

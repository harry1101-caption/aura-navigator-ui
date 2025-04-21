
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import GanttChart from "@/components/gantt/GanttChart";

const RocksPage = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Company Rocks</h1>
        <GanttChart />
      </div>
    </Layout>
  );
};

export default RocksPage;

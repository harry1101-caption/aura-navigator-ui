
import Layout from "@/components/layout/Layout";
import GanttChart from "@/components/gantt/GanttChart";

const RocksPage = () => {
  return (
    <Layout>
      <div className="mx-auto w-full max-w-[1400px] px-4 py-3">
        <GanttChart />
      </div>
    </Layout>
  );
};

export default RocksPage;

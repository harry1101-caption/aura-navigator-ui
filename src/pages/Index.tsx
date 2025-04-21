
import Layout from '../components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Aura Navigator</h1>
        <p className="text-gray-600">
          This is your project management dashboard inspired by the design you provided. The layout includes:
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
          <li>A fixed sidebar (256px wide)</li>
          <li>A fixed header (56px tall)</li>
          <li>A fixed subheader (56px tall)</li>
          <li>Primary color: #F37F26</li>
        </ul>
        <p className="mt-4 text-gray-600">
          You can now expand this dashboard with your project management features.
        </p>
      </div>
    </Layout>
  );
};

export default Index;

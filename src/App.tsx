import { Layout } from "./components/templates/Layout";
import { Home } from "./components/pages/Home";

const App: React.FC = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default App;

import { Text, Title } from "@mantine/core"
import { Layout } from "./components/Layout"

function App() {
  
  return (
    <>
      <Layout>
        <Title order={3}>Hello</Title>
        <Text mb="lg">This is a paragraph. Hahaha!</Text>

        <Title order={3}>Hello</Title>
        <Text mb="lg">This is a paragraph. Hahaha!</Text>

        <Title order={3}>Hello</Title>
        <Text mb="lg">This is a paragraph. Hahaha!</Text>

        <Title order={3}>Hello</Title>
        <Text mb="lg">This is a paragraph. Hahaha!</Text>
      </Layout>
    </>
  )
}

export default App

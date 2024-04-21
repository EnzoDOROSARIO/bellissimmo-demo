import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 px-32 pt-5">
        <h1 className="text-5xl font-extrabold">Belliss'immo</h1>
        <div>
          <h2 className="text-3xl font-bold mt-5 mb-2">Vos favoris</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((n) => (
              <Card key={n}>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mt-5 mb-2">Nos biens</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <Card key={n}>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

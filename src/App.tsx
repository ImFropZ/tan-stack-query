import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface IUser {
  id: number;
  name: string;
  username: string;
}

interface IPost {
  title: string;
}

async function fetchTodos(query: string): Promise<IUser[] | IPost[]> {
  return fetch("https://jsonplaceholder.typicode.com/" + query).then((res) =>
    res.json()
  );
}

function App() {
  const [query, setQuery] = useState("users");

  const { data, isLoading, error } = useQuery({
    queryKey: [query],
    queryFn: () => fetchTodos(query),
  });

  return (
    <>
      <div className="flex gap-5">
        <span
          className={`px-10 py-4 border cursor-pointer ${
            query === "users" ? "bg-blue-300" : "bg-transparent"
          }`}
          onClick={() => setQuery("users")}
        >
          User
        </span>
        <span
          className={`px-10 py-4 border cursor-pointer ${
            query === "posts" ? "bg-blue-300" : "bg-transparent"
          }`}
          onClick={() => setQuery("posts")}
        >
          Post
        </span>
        <span
          className={`px-10 py-4 border cursor-pointer ${
            query === "albums" ? "bg-blue-300" : "bg-transparent"
          }`}
          onClick={() => setQuery("albums")}
        >
          Album
        </span>
        <span
          className={`px-10 py-4 border cursor-pointer ${
            query === "todos" ? "bg-blue-300" : "bg-transparent"
          }`}
          onClick={() => setQuery("todos")}
        >
          To-Do
        </span>
      </div>
      <div>
        <ul className="ml-5">
          {isLoading
            ? ""
            : data?.map((d) => (
                <li className="list-disc">{"name" in d ? d.name : d.title}</li>
              ))}
        </ul>
        <pre>{isLoading ? "Loading..." : JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;

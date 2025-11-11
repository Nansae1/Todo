"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { AlertTriangle } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";

import { use, useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [SelectedButton, setSelectedButton] = useState("All");

  const handleAdd = () => {
    const text = task.trim();
    if (!text) return;
    setTasks([
      ...tasks,
      {
        isDone: false,
        text: task,
        id: nanoid(),
      },
    ]);
    setTask("");
  };
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    alert("are you sure?");
    setTasks((prev) => prev.filter((item) => !item.isDone));
  };

  const completedtasks = tasks.filter((item) => item.isDone).length;
  const Taskscount = tasks.length;

  console.log(tasks);
  return (
    <div className="flex justify-center py-20">
      <Card className="w-94.25 ">
        <CardHeader className="flex justify-center">
          <h1 className="text-[20px] font-semibold">To-Do list</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 px-0 ">
          <div className="flex gap-1.5 justify-center">
            <Input
              value={task}
              placeholder="Add a new task..."
              className="h-10 w-70"
              onChange={(e) => setTask(e.target.value)}
            ></Input>
            <Button
              className="h-10 w-14.75 bg-[#3C82F6] hover:bg-[#3C82F6]  text-[#F9F9F9]"
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
          <div className="flex gap-1.5">
            <Tabs value={SelectedButton} onValueChange={setSelectedButton}>
              <TabsList className="flex gap-1.5 pl-4">
                <TabsTrigger
                  value="All"
                  className="data-[state=active]:bg-[#3C82F6] data-[state=active]:text-white h-8"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="Active"
                  className="data-[state=active]:bg-[#3C82F6] data-[state=active]:text-white h-8"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="Completed"
                  className="data-[state=active]:bg-[#3C82F6] data-[state=active]:text-white h-8"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-5 items-center">
            {tasks
              .filter((item) => {
                if (SelectedButton === "All") return true;
                if (SelectedButton === "Completed") return item.isDone === true;
                return item.isDone === false;
              })
              .map((task, index) => (
                <div
                  className="h-15.5 w-86.25 bg-[#F9FAFB] flex items-center justify-between p-4 rounded-md"
                  key={index}
                >
                  <div className="flex justify-center items-center gap-1">
                    <Checkbox
                      checked={task.isDone}
                      onCheckedChange={() => {
                        setTasks((prev) =>
                          prev.map((item) =>
                            item.id === task.id
                              ? { ...item, isDone: !item.isDone }
                              : item
                          )
                        );
                      }}
                      id={task.id}
                    />
                    <p className={task.isDone ? "line-through" : ""}>
                      {task.text}
                    </p>
                  </div>
                  <Button
                    className="bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEF2F2]"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
          </div>
          {tasks.length == 0 && (
            <div className="flex justify-center text-[#6B7280] text-[14px] pt-3 pb-5">
              No tasks yet. Add one above!
            </div>
          )}
          {tasks.length > 0 && (
            <div className="w-86 ml-3.5 flex justify-between items-center border-t border-t-grey">
              <div className="text-[#6B7280] text-[14px]">
                {completedtasks} of {Taskscount} tasks completed
              </div>
              <Button
                className="bg-white text-[#EF4444] hover:bg-white"
                onClick={() => handleClear()}
              >
                Clear Completed
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-1">
          <div className="text-[#6B7280] text-[12px]">Powered by</div>
          <div className="text-[12px] text-[#3B73ED]">Pinecone academy</div>
        </CardFooter>
      </Card>
    </div>
  );
}

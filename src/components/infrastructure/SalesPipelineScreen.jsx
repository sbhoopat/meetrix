import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@mui/material";

const initialStages = {
  Prospect: [{ id: "1", name: "John Doe" }],
  Qualification: [],
  Proposal: [],
  Negotiation: [],
  Closure: [],
};

const SalesPipelineScreen = () => {
  const [stages, setStages] = useState(initialStages);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStage = stages[source.droppableId];
    const destStage = stages[destination.droppableId];
    const [movedItem] = sourceStage.splice(source.index, 1);
    destStage.splice(destination.index, 0, movedItem);

    setStages({
      ...stages,
      [source.droppableId]: sourceStage,
      [destination.droppableId]: destStage,
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#002133] mb-6">Sales Pipeline</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.keys(stages).map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-2 bg-gray-50 rounded-md shadow-md"
                >
                  <h2 className="text-lg font-semibold mb-3 text-[#002133]">{stage}</h2>
                  <Card className="p-4 bg-white min-h-[200px]">
                    {stages[stage].map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 mb-2 bg-[#f3f4f6] rounded-md shadow cursor-move"
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Card>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default SalesPipelineScreen;

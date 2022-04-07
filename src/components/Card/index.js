import React, { useContext, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";
import { CloseOutlined } from "@material-ui/icons";

import { Draggable } from "react-beautiful-dnd";

import storeApi from "../../utils/storeApi";

import "./styles.scss";

export default function Card({ card, index, listId }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  const { removeCard, updateCardTitle } = useContext(storeApi);

  const handleOnBlur = () => {
    updateCardTitle(newTitle, description, index, listId);
    setOpen(!open);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="card-content">
            {open ? (
              <TextareaAutosize
                type="text"
                className="input-card-title"
                value={newTitle}
                desc={description}
                
                onChange={(e) => {
                  setNewTitle(e.target.value)
                  setDescription(e.target.desc)
                }
                }
                onBlur={handleOnBlur}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleOnBlur();
                  }
                  return;
                }}
                autoFocus
              />
            //   <TextareaAutosize
            //   type="text"
            //   className="input-card-title"
            //   value={description}
            //   onChange={(e) => setDescription(e.target.description)}
            //   onBlur={handleOnBlur}
            //   onKeyPress={(e) => {
            //     if (e.key === "Enter") {
            //       handleOnBlur();
            //     }
            //     return;
            //   }}
            //   autoFocus
            // />
            ) : (
              <div
                onClick={() => setOpen(!open)}
                className="card-title-container"
              >
              <div>
                <p>{card.title}</p>
                <p>{card.description}</p>
              </div>
              
                <button
                  onClick={() => {
                    removeCard(index, listId);
                  }}
                >
                  <CloseOutlined />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

import React, { useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Notebook.css";
import NotebookUnit from "../modules/NotebookUnit";
import Header from "../modules/Header";
import { useNavigate } from "react-router-dom";
import NotebookEntry from "../modules/NotebookEntry.js";
import FolderDisplay from "../modules/FolderDisplay.js";
const Notebook = ({ userId }) => {
  const [mode, setMode] = useState("folder");
  const [index, setIndex] = useState(0);
  const [entries, setEntries] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState("Uncategorized");
  const navigate = useNavigate;

  const newEntry = (props) => {
    post("/api/newEntry", { userId: userId, text: "", header: props.header, folder: folder }).then(
      (entry) => {
        setEntries(entries.concat([entry]));

        console.log(entries.concat([entry]));
      }
    );
  };
  const newFolder = (props) => {
    post("/api/folder", { userId: userId, folders: folders.concat(props.folder) }).then((entry) => {
      setFolders(folders.concat(props.folder));

      console.log(folders.concat(props.folder));
    });
  };
  const deleteEntry = (index) => {
    post("/api/deleteEntry", entries[index])
      .then(() => {
        //console.log(entries);
        //console.log(entries[index]);
        console.log(index);
        console.log(entries.filter((_, ind, b) => index !== ind));

        const filtered = entries.filter((_, ind, b) => index !== ind);
        console.log(filtered);
        setEntries((entries) => entries.filter((_, ind, b) => index !== ind));
        console.log(entries);
      })
      .catch(console.log("oops"));
  };
  const deleteFolder = async (index) => {
    let post1 = await post("/api/folder", {
      userId: userId,
      folders: folders.filter((_, ind, b) => ind !== index),
    });
    for (let i = 0; i++; i < entries.length) {
      if (entries[i].folder === folders[index]) {
        let x = await post("/api/entry", {
          _id: entries[i],
          folder: "Uncategorized",
          header: entries[i].header,
          text: entry.text,
        });
      }
    }
    setFolders(folders.filter((val, ind, b) => ind !== index));
    let newEntries = entries.map((entry, i) =>
      entry.folder === folders[index]
        ? { text: entry.text, header: entry.header, folder: "Uncategorized" }
        : entry
    );
    setEntries(newEntries);

    console.log(entries);
  };

  useEffect(() => {
    console.log(entries);
  }, [entries]);
  const changeMode = (value) => {
    setMode(value);
  };
  const updateEntries = (value, entry_index) => {
    setEntries((entries) => entries.map((entry, i) => (i === entry_index ? value : entry)));
  };
  const changeHeader = (value) => {
    post("/api/entry", { userId: userId, header: value, text: entries[index].text }).then(() => {
      setEntries((entries) =>
        entries.map((entry, i) => (i === index ? { text: entry.text, header: value } : entry))
      );
    });
  };
  const changeFolder = async (value) => {
    let post1 = await post("/api/folder", {
      userId: userId,
      folders: folders.map((folder, i) => (i === index ? value : folder)),
    });
    setEntries((entries) =>
      entries.map((entry, i) =>
        entry.folder === folders[index]
          ? { header: entry.header, text: entry.text, folder: value }
          : entry
      )
    );
    for (let i = 0; i++; i < entries.length) {
      if (entries[i].folder === folders[index]) {
        let x = await post("/api/entry", {
          _id: entries[i],
          folder: value,
          header: entries[i].header,
          text: entry.text,
        });
      }
    }

    setFolders((folders) => folders.map((folder, i) => (i === index ? value : folder)));
  };

  useEffect(() => {
    //console.log(entries);
    const populate = () => {
      get("/api/folder", { userId: userId }).then((folders_returned) => {
        if (folders_returned.length === 0) {
          folders_returned = [{ folders: ["Uncategorized"] }];
        }
        console.log(folders_returned);
        setFolders(folders_returned[0].folders);
        console.log(folders_returned);
      });

      get("/api/entry", { userId: userId }).then((entries_returned) => {
        console.log("returned", entries_returned);
        setEntries(entries_returned);
      });
    };
    populate();
  }, []);

  let content;
  if (mode === "page") {
    if (entries.length !== 0) {
      //console.log(entries);
      content = (
        <NotebookEntry
          updateEntries={updateEntries}
          entry={entries.filter((value, ind, b) => value.folder === folder)[index]}
          userId={userId}
          changePage={changeMode}
          index={index}
          entries={entries.filter((value, ind, b) => value.folder === folder)}
          folder={folder}
        />
      );
    } else {
      setMode("pagelist");
    }
  } else if (mode === "folder") {
    content = (
      <FolderDisplay
        changeFolder={changeFolder}
        setFolder={setFolder}
        folders={folders}
        changeMode={changeMode}
        newFolder={newFolder}
        changeIndex={setIndex}
        deleteFolder={deleteFolder}
      />
    );
  } else {
    content = (
      <NotebookUnit
        changeHeader={changeHeader}
        setIndex={setIndex}
        entries={entries.filter((value, ind, b) => value.folder === folder)}
        changeMode={changeMode}
        newEntry={newEntry}
        changeIndex={setIndex}
        deleteEntry={deleteEntry}
        folder={folder}
      />
    );
  }
  return userId ? <div>{content} </div> : <>{navigate("/")}</>;
};

export default Notebook;

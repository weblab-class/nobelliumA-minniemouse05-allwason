import React, { useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Notebook.css";
import NotebookUnit from "../modules/NotebookUnit";
import { useNavigate } from "react-router-dom";
import NotebookEntry from "../modules/NotebookEntry.js";
import FolderDisplay from "../modules/FolderDisplay.js";
import ExitButton from "../modules/ExitButton";

const Notebook = ({ userId }) => {
  const [mode, setMode] = useState("folder");
  const [index, setIndex] = useState(0);
  const [entries, setEntries] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState("Uncategorized");
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate;

  const newEntry = (props) => {
    post("/api/newEntry", { userId: userId, text: "", header: props.header, folder: folder }).then(
      (entry) => {
        //console.log(entry);
        setEntries(entries.concat([entry]));

        //console.log(entries.concat([entry]));
      }
    );
  };
  const newFolder = (props) => {
    post("/api/folder", { userId: userId, folders: folders.concat(props.folder) }).then((entry) => {
      setFolders(folders.concat(props.folder));

      //(folders.concat(props.folder));
    });
  };
  const deleteEntry = (index) => {
    const find = entries.filter((value, ind, b) => value.folder === folder)[index];
    post("/api/deleteEntry", find)
      .then(() => {
        //console.log(entries);
        //console.log(entries[index]);
        //console.log(index);
        // console.log(
        //   entries
        //     .filter((value, ind, b) => value.folder === folder)
        //     .filter((_, ind, b) => index !== ind)
        // );

        const filtered = entries.filter((value, ind, b) => value.folder === folder);
        let i = filtered.indexOf(folder);
        //console.log(filtered);
        setEntries((entries) => entries.filter((entry, ind, b) => entry._id !== find._id));
        //console.log(entries);
      })
      .catch();
  };
  const deleteFolder = async (ind) => {
    let post1 = await post("/api/folder", {
      userId: userId,
      folders: folders.filter((_, i, b) => i !== ind),
    });
    for (let i = 0; i++; i < entries.length) {
      if (entries[i].folder === folders[ind]) {
        let x = await post("/api/entry", {
          _id: entries[i],
          userId: userId,
          folder: "Uncategorized",
          header: entries[i].header,
          text: entry.text,
        });
      }
    }
    setFolders(folders.filter((val, i, b) => i !== ind));
    let newEntries = entries.map((entry, i) =>
      entry.folder === folders[ind]
        ? { _id: entry._id, text: entry.text, header: entry.header, folder: "Uncategorized" }
        : entry
    );
    setEntries(newEntries);

    //console.log(entries);
  };

  const changeMode = (value) => {
    setMode(value);
  };
  const updateEntries = (value, entry_index) => {
    setEntries((entries) => entries.map((entry, i) => (i === entry_index ? value : entry)));
  };
  const changeHeader = (value) => {
    const find = entries.filter((value, ind, b) => value.folder === folder)[index];
    post("/api/entry", {
      userId: userId,
      header: value,
      text: find.text,
      folder: find.folder,
      _id: find._id,
    }).then((entry) => {
      //console.log(entry);
      setEntries((entries) =>
        entries.map((entry, i) =>
          entry._id === find._id
            ? { _id: entry._id, folder: entry.folder, text: entry.text, header: value }
            : entry
        )
      );
    });
  };
  const changeFolder = async (value, ind) => {
    // console.log(value);

    // console.log(folders[ind], entries.length);

    for (let k = 0; k < entries.length; k++) {
      //console.log("bith");
      //console.log(entries[k].folder, folders[ind]);
      if (entries[k].folder === folders[ind]) {
        //console.log("posting");
        let x = await post("/api/entry", {
          _id: entries[k]._id,
          userId: userId,
          folder: value,
          header: entries[k].header,
          text: entries[k].text,
        });
      }
    }

    setEntries((entries) =>
      entries.map((entry, i) =>
        entry.folder === folders[ind]
          ? { _id: entry._id, header: entry.header, text: entry.text, folder: value }
          : entry
      )
    );
    let post1 = await post("/api/folder", {
      userId: userId,
      folders: folders.map((folder, i) => (i === ind ? value : folder)),
    });
    setFolders((folders) => folders.map((folder, i) => (i === ind ? value : folder)));
  };
  const handleFolderChange = async (folder, entry) => {
    try {
      //console.log("changing folder");
      const updatedEntry = await updateEntryFolder(folder, entry);
      const ind = entries.indexOf(entry);
      //console.log(ind, entry);
      setFolder(folder);
      setEntries((entries) => entries.map((e, i) => (i === ind ? { ...e, folder: folder } : e)));

      //console.log(entries);
    } catch (error) {
      console.error("Error handling folder change:", error);
    }
  };

  const updateEntryFolder = async (folder, entry) => {
    //console.log(entry);
    const updatedEntryData = {
      _id: entry._id,
      userId: userId,
      header: entry.header,
      text: entry.text,
      folder: folder,
    };
    //console.log(updatedEntryData);

    const updatedEntry = await post("/api/entry", updatedEntryData);
    return updatedEntry;
  };

  useEffect(() => {
    const populate = () => {
      get("/api/folder", { userId: userId }).then((folders_returned) => {
        if (folders_returned && folders_returned.length === 0) {
          folders_returned = [{ folders: ["Uncategorized", "Shared"] }];
        }
        //console.log(folders_returned);
        setFolders(folders_returned[0].folders);
        //console.log(folders_returned);
      });

      get("/api/entry", { userId: userId }).then((entries_returned) => {
        //console.log("returned", entries_returned);
        setEntries(entries_returned);
      });
      get("/api/friends", { userId: userId }).then((result) => {
        setFriends(result.friends);
      });
    };
    populate();
  }, []);

  let content;
  if (mode === "page") {
    if (entries && entries.length !== 0) {
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
          folders={folders}
          handleFolderChange={handleFolderChange}
          friends={friends}
          _id={entries.filter((value, ind, b) => value.folder === folder)[index]._id}
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
  return userId ? (
    <div>
      <ExitButton />
      {content}
    </div>
  ) : (
    <>{navigate("/")}</>
  );
};

export default Notebook;

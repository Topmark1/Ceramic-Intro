import {useState} from "react"
import { useViewerRecord } from "@self.id/react";

export default function RecordSetter() {
  const [name, setName] = useState("");
  const record = useViewerRecord("basicProfile");

const updateRecordName = async (name) => {
  await record.merge({
    name: name,
  });
};
return (
  <div className="content">
    <div className="mt2">
      {record.content ? (
        <div className="flexCol">
          <span className="subtitle">Hello {record.content.name}!</span>

          <span>
            The above name was loaded from Ceramic Network. Try updating it
            below.
          </span>
        </div>
      ) : (
        <span>
          You do not have a profile record attached to your 3ID. Create a basic
          profile by setting a name below.
        </span>
      )}
    </div>

    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="mt2"
    />
    <button onClick={() => updateRecordName(name)}>Update</button>
  </div>
);
}
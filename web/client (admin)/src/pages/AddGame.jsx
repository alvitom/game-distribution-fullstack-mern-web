import { Input, Group, Text, rem, NumberInput, MultiSelect } from "@mantine/core";
import React, { useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { DatePickerInput } from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FaImages, FaVideo, FaUpload } from "react-icons/fa";

const content = "";

const AddGame = (props) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight, TextAlign.configure({ types: ["heading", "paragraph"] })],
    content,
  });

  const [value, setValue] = useState(null);

  return (
    <>
      <div className="add-game-wrapper">
        <h1>Add New Game</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="title">Title</label>
            <Input placeholder="Title" size="md" id="title" />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="description">Description</label>
            <RichTextEditor editor={editor} id="description">
              <RichTextEditor.Toolbar>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </div>
          <div className="row">
            <div className="col-4 d-flex flex-column gap-2">
              <label htmlFor="developer">Developer</label>
              <Input placeholder="Developer" size="md" id="developer" />
            </div>
            <div className="col-4 d-flex flex-column gap-2">
              <label htmlFor="publisher">Publisher</label>
              <Input placeholder="Publisher" size="md" id="publisher" />
            </div>
            <div className="col-4 d-flex flex-column gap-2">
              <label htmlFor="release-date">Release Date</label>
              <DatePickerInput valueFormat="MM/DD/YY" placeholder="Release Date" value={value} onChange={setValue} size="md" id="release-date" />
            </div>
          </div>
          <div className="row">
            <div className="col-4 d-flex flex-column gap-2">
              <MultiSelect label="Genre" placeholder="Pick Genre" data={["Narration", "Adventure", "Action-Adventure", "Card Game"]} clearable />
            </div>
            <div className="col-4 d-flex flex-column gap-2">
              <MultiSelect label="Feature" placeholder="Pick Feature" data={["Controller Support", "Single Player", "Achievements", "Co-op"]} clearable />
            </div>
            <div className="col-4 d-flex flex-column gap-2">
              <MultiSelect label="Platform" placeholder="Pick Platform" data={["Windows", "Mac OS", "Linux"]} clearable />
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="cover-images">Cover Images</label>
            <Dropzone onDrop={(files) => console.log("accepted files", files)} onReject={(files) => console.log("rejected files", files)} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <FaUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>{/* <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} /> */}</Dropzone.Reject>
                <Dropzone.Idle>
                  <FaImages style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="images">Images</label>
            <Dropzone onDrop={(files) => console.log("accepted files", files)} onReject={(files) => console.log("rejected files", files)} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>{/* <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} /> */}</Dropzone.Accept>
                <Dropzone.Reject>{/* <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} /> */}</Dropzone.Reject>
                <Dropzone.Idle>{/* <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} /> */}</Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="videos">Videos</label>
            <Dropzone onDrop={(files) => console.log("accepted files", files)} onReject={(files) => console.log("rejected files", files)} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>{/* <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} /> */}</Dropzone.Accept>
                <Dropzone.Reject>{/* <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} /> */}</Dropzone.Reject>
                <Dropzone.Idle>
                  <FaVideo style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="price">Price</label>
            <NumberInput placeholder="Price" prefix="Rp" mb="xl" size="md" id="price" allowNegative={false} thousandSeparator="," />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25">Add Game</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGame;

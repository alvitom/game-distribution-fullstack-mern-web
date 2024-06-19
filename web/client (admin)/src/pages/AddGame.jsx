import { Input, Group, Text, rem, NumberInput, MultiSelect, Fieldset, TextInput, TagsInput } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { DatePickerInput } from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { FaImages, FaVideo, FaUpload, FaDownload } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { GenreContext } from "../context/GenreContext";
import { FeatureContext } from "../context/FeatureContext";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

const initialSystemRequirements = {
  windows: {
    minimum: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
      directX: "",
      other: "",
    },
    recommended: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
      directX: "",
      other: "",
    },
  },
  macOS: {
    minimum: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
      directX: "",
      other: "",
    },
    recommended: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
      directX: "",
      other: "",
    },
  },
  linux: {
    minimum: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
      directX: "",
      other: "",
    },
    recommended: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
      directX: "",
      other: "",
    },
  },
  additionalNotes: "",
  loginAccountsRequired: [],
  languagesSupported: [],
};

const AddGame = (props) => {
  const navigate = useNavigate();
  const { loading, createGame } = useContext(GameContext);
  const { genres, fetchAllGenres } = useContext(GenreContext);
  const { features, fetchAllFeatures } = useContext(FeatureContext);
  const { languages, fetchAllLanguages } = useContext(LanguageContext);
  const [systemRequirements, setSystemRequirements] = useState(initialSystemRequirements);
  const [game, setGame] = useState({
    title: "",
    price: null,
    description: "",
    developer: "",
    publisher: "",
    genres: [],
    features: [],
    platform: [],
    releaseDate: null,
    images: [],
    videos: [],
    coverImages: [],
    fileDownload: "",
  });

  useEffect(() => {
    fetchAllGenres();
    fetchAllFeatures();
    fetchAllLanguages();
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight, TextAlign.configure({ types: ["heading", "paragraph"] })],
    content: game.description,
    onUpdate: ({ editor }) => {
      setGame((prevState) => ({
        ...prevState,
        description: editor.getText(),
      }));
    },
  });

  const handleCreateGame = async () => {
    const formData = new FormData();
    formData.append("title", game.title);
    formData.append("description", game.description);
    formData.append("developer", game.developer);
    formData.append("publisher", game.publisher);
    formData.append("releaseDate", game.releaseDate);
    game.genres.forEach((genre) => {
      formData.append("genres", genre);
    });
    game.features.forEach((feature) => {
      formData.append("features", feature);
    });
    formData.append("platform", game.platform);
    formData.append("price", game.price);
    formData.append("systemRequirements", JSON.stringify(systemRequirements));
    formData.append("fileDownload", game.fileDownload.path);
    game.coverImages.forEach((image) => {
      formData.append(`coverImages`, image);
    });
    game.images.forEach((image) => {
      formData.append(`images`, image);
    });
    game.videos.forEach((video) => {
      formData.append(`videos`, video);
    });
    await createGame(formData);
  };

  const uploadCoverImages = (files) => {
    files.map((file) => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    setGame((prevState) => ({
      ...prevState,
      coverImages: [...prevState.coverImages, ...files],
    }));
  };

  const uploadImages = (files) => {
    files.map((file) => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    setGame((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const uploadVideos = (files) => {
    files.map((file) => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    setGame((prevState) => ({
      ...prevState,
      videos: [...prevState.videos, ...files],
    }));
  };

  const uploadFileDownload = (files) => {
    setGame((prevState) => ({
      ...prevState,
      fileDownload: files[0],
    }));
  };

  useEffect(() => {
    return () => {
      game.coverImages.forEach((file) => URL.revokeObjectURL(file.preview));
      game.images.forEach((file) => URL.revokeObjectURL(file.preview));
      game.videos.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [game.coverImages, game.images, game.videos]);

  const coverImages = game.coverImages.map((image, index) => (
    <div className="col-2 mt-2" key={index}>
      <img src={image.preview} alt={image.name} className="img-fluid" />
    </div>
  ));
  const images = game.images.map((image, index) => (
    <div className="col-2 mt-2" key={index}>
      <img src={image.preview} alt={image.name} className="img-fluid" />
    </div>
  ));
  const videos = game.videos.map((video, index) => (
    <div className="col-3 mt-2" key={index}>
      <video controls className="img-fluid">
        <source type="video/mp4" src={video.preview} />
      </video>
    </div>
  ));

  const handleChange = (e, category, level, field) => {
    const { value } = e.target;
    setSystemRequirements((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [level]: {
          ...prev[category][level],
          [field]: value,
        },
      },
    }));
  };
  return (
    <>
      <div className="add-game-wrapper">
        <h1>Add New Game</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="title">Title</label>
            <Input placeholder="Title" size="md" id="title" value={game.title} onChange={(e) => setGame((prevGame) => ({ ...prevGame, title: e.target.value }))} />
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
              <Input placeholder="Developer" size="md" id="developer" value={game.developer} onChange={(e) => setGame((prevGame) => ({ ...prevGame, developer: e.target.value }))} />
            </div>
            <div className="col-4 d-flex flex-column gap-2">
              <label htmlFor="publisher">Publisher</label>
              <Input placeholder="Publisher" size="md" id="publisher" value={game.publisher} onChange={(e) => setGame((prevGame) => ({ ...prevGame, publisher: e.target.value }))} />
            </div>
            <div className="col-4 d-flex flex-column gap-2">
              <label htmlFor="release-date">Release Date</label>
              <DatePickerInput valueFormat="MM/DD/YY" placeholder="Release Date" value={game.releaseDate} onChange={(date) => setGame((prevGame) => ({ ...prevGame, releaseDate: date }))} size="md" id="release-date" />
            </div>
          </div>
          <div className="row">
            <div className="col-4 d-flex flex-column gap-2">
              <MultiSelect
                label="Genre"
                placeholder="Pick Genre"
                data={genres.map((item) => ({
                  value: item._id,
                  label: item.genre,
                }))}
                value={game.genres}
                onChange={(value) => setGame((prevGame) => ({ ...prevGame, genres: value }))}
                clearable
                searchable
              />
            </div>
            <div className="col-4 d-flex flex-column gap-2">
              <MultiSelect
                label="Feature"
                placeholder="Pick Feature"
                data={features.map((item) => ({
                  value: item._id,
                  label: item.feature,
                }))}
                value={game.features}
                onChange={(value) => setGame((prevGame) => ({ ...prevGame, features: value }))}
                clearable
                searchable
              />
            </div>
            <div className="col-4 d-flex flex-column gap-2">
              <MultiSelect label="Platform" placeholder="Pick Platform" data={["Windows", "Mac OS", "Linux"]} value={game.platform} onChange={(value) => setGame((prevGame) => ({ ...prevGame, platform: value }))} clearable />
            </div>
          </div>
          {game.platform.length > 0 && (
            <div className="row flex-column gap-2">
              <label>System Requirements</label>
              {game.platform.includes("Windows") && (
                <div className="col-12">
                  <Fieldset legend="Windows">
                    <div className="row">
                      <div className="col-6">
                        <Fieldset legend="Minimum">
                          <TextInput label="OS" placeholder="Operating System" value={systemRequirements.windows.minimum.os} onChange={(e) => handleChange(e, "windows", "minimum", "os")} />
                          <TextInput label="Processor" placeholder="Processor" mt="md" value={systemRequirements.windows.minimum.processor} onChange={(e) => handleChange(e, "windows", "minimum", "processor")} />
                          <TextInput label="Memory" placeholder="Memory" mt="md" value={systemRequirements.windows.minimum.memory} onChange={(e) => handleChange(e, "windows", "minimum", "memory")} />
                          <TextInput label="Graphics" placeholder="Graphics" mt="md" value={systemRequirements.windows.minimum.graphics} onChange={(e) => handleChange(e, "windows", "minimum", "graphics")} />
                          <TextInput label="Storage" placeholder="Storage" mt="md" value={systemRequirements.windows.minimum.storage} onChange={(e) => handleChange(e, "windows", "minimum", "storage")} />
                          <TextInput label="Direct X" placeholder="Direct X" mt="md" value={systemRequirements.windows.minimum.directX} onChange={(e) => handleChange(e, "windows", "minimum", "directX")} />
                          <TextInput label="Other" placeholder="Other" mt="md" value={systemRequirements.windows.minimum.other} onChange={(e) => handleChange(e, "windows", "minimum", "other")} />
                        </Fieldset>
                      </div>
                      <div className="col-6">
                        <Fieldset legend="Recommended">
                          <TextInput label="OS" placeholder="Operating System" value={systemRequirements.windows.recommended.os} onChange={(e) => handleChange(e, "windows", "recommended", "os")} />
                          <TextInput label="Processor" placeholder="Processor" mt="md" value={systemRequirements.windows.recommended.processor} onChange={(e) => handleChange(e, "windows", "recommended", "processor")} />
                          <TextInput label="Memory" placeholder="Memory" mt="md" value={systemRequirements.windows.recommended.memory} onChange={(e) => handleChange(e, "windows", "recommended", "memory")} />
                          <TextInput label="Graphics" placeholder="Graphics" mt="md" value={systemRequirements.windows.recommended.graphics} onChange={(e) => handleChange(e, "windows", "recommended", "graphics")} />
                          <TextInput label="Storage" placeholder="Storage" mt="md" value={systemRequirements.windows.recommended.storage} onChange={(e) => handleChange(e, "windows", "recommended", "storage")} />
                          <TextInput label="Direct X" placeholder="Direct X" mt="md" value={systemRequirements.windows.recommended.directX} onChange={(e) => handleChange(e, "windows", "recommended", "directX")} />
                          <TextInput label="Other" placeholder="Other" mt="md" value={systemRequirements.windows.recommended.other} onChange={(e) => handleChange(e, "windows", "recommended", "other")} />
                        </Fieldset>
                      </div>
                    </div>
                  </Fieldset>
                </div>
              )}
              {game.platform.includes("Mac OS") && (
                <div className="col-12">
                  <Fieldset legend="Mac OS">
                    <div className="row">
                      <div className="col-6">
                        <Fieldset legend="Minimum">
                          <TextInput label="OS" placeholder="Operating System" value={systemRequirements.macOS.minimum.os} onChange={(e) => handleChange(e, "macOS", "minimum", "os")} />
                          <TextInput label="Processor" placeholder="Processor" mt="md" value={systemRequirements.macOS.minimum.processor} onChange={(e) => handleChange(e, "macOS", "minimum", "processor")} />
                          <TextInput label="Memory" placeholder="Memory" mt="md" value={systemRequirements.macOS.minimum.memory} onChange={(e) => handleChange(e, "macOS", "minimum", "memory")} />
                          <TextInput label="Graphics" placeholder="Graphics" mt="md" value={systemRequirements.macOS.minimum.graphics} onChange={(e) => handleChange(e, "macOS", "minimum", "graphics")} />
                          <TextInput label="Storage" placeholder="Storage" mt="md" value={systemRequirements.macOS.minimum.storage} onChange={(e) => handleChange(e, "macOS", "minimum", "storage")} />
                          <TextInput label="Direct X" placeholder="Direct X" mt="md" value={systemRequirements.macOS.minimum.directX} onChange={(e) => handleChange(e, "macOS", "minimum", "directX")} />
                          <TextInput label="Other" placeholder="Other" mt="md" value={systemRequirements.macOS.minimum.other} onChange={(e) => handleChange(e, "macOS", "minimum", "other")} />
                        </Fieldset>
                      </div>
                      <div className="col-6">
                        <Fieldset legend="Recommended">
                          <TextInput label="OS" placeholder="Operating System" value={systemRequirements.macOS.recommended.os} onChange={(e) => handleChange(e, "macOS", "recommended", "os")} />
                          <TextInput label="Processor" placeholder="Processor" mt="md" value={systemRequirements.macOS.recommended.processor} onChange={(e) => handleChange(e, "macOS", "recommended", "processor")} />
                          <TextInput label="Memory" placeholder="Memory" mt="md" value={systemRequirements.macOS.recommended.memory} onChange={(e) => handleChange(e, "macOS", "recommended", "memory")} />
                          <TextInput label="Graphics" placeholder="Graphics" mt="md" value={systemRequirements.macOS.recommended.graphics} onChange={(e) => handleChange(e, "macOS", "recommended", "graphics")} />
                          <TextInput label="Storage" placeholder="Storage" mt="md" value={systemRequirements.macOS.recommended.storage} onChange={(e) => handleChange(e, "macOS", "recommended", "storage")} />
                          <TextInput label="Direct X" placeholder="Direct X" mt="md" value={systemRequirements.macOS.recommended.directX} onChange={(e) => handleChange(e, "macOS", "recommended", "directX")} />
                          <TextInput label="Other" placeholder="Other" mt="md" value={systemRequirements.macOS.recommended.other} onChange={(e) => handleChange(e, "macOS", "recommended", "other")} />
                        </Fieldset>
                      </div>
                    </div>
                  </Fieldset>
                </div>
              )}
              {game.platform.includes("Linux") && (
                <div className="col-12">
                  <Fieldset legend="Linux">
                    <div className="row">
                      <div className="col-6">
                        <Fieldset legend="Minimum">
                          <TextInput label="OS" placeholder="Operating System" value={systemRequirements.linux.minimum.os} onChange={(e) => handleChange(e, "linux", "minimum", "os")} />
                          <TextInput label="Processor" placeholder="Processor" mt="md" value={systemRequirements.linux.minimum.processor} onChange={(e) => handleChange(e, "linux", "minimum", "processor")} />
                          <TextInput label="Memory" placeholder="Memory" mt="md" value={systemRequirements.linux.minimum.memory} onChange={(e) => handleChange(e, "linux", "minimum", "memory")} />
                          <TextInput label="Graphics" placeholder="Graphics" mt="md" value={systemRequirements.linux.minimum.graphics} onChange={(e) => handleChange(e, "linux", "minimum", "graphics")} />
                          <TextInput label="Storage" placeholder="Storage" mt="md" value={systemRequirements.linux.minimum.storage} onChange={(e) => handleChange(e, "linux", "minimum", "storage")} />
                          <TextInput label="Direct X" placeholder="Direct X" mt="md" value={systemRequirements.linux.minimum.directX} onChange={(e) => handleChange(e, "linux", "minimum", "directX")} />
                          <TextInput label="Other" placeholder="Other" mt="md" value={systemRequirements.linux.minimum.other} onChange={(e) => handleChange(e, "linux", "minimum", "other")} />
                        </Fieldset>
                      </div>
                      <div className="col-6">
                        <Fieldset legend="Recommended">
                          <TextInput label="OS" placeholder="Operating System" value={systemRequirements.linux.recommended.os} onChange={(e) => handleChange(e, "linux", "recommended", "os")} />
                          <TextInput label="Processor" placeholder="Processor" mt="md" value={systemRequirements.linux.recommended.processor} onChange={(e) => handleChange(e, "linux", "recommended", "processor")} />
                          <TextInput label="Memory" placeholder="Memory" mt="md" value={systemRequirements.linux.recommended.memory} onChange={(e) => handleChange(e, "linux", "recommended", "memory")} />
                          <TextInput label="Graphics" placeholder="Graphics" mt="md" value={systemRequirements.linux.recommended.graphics} onChange={(e) => handleChange(e, "linux", "recommended", "graphics")} />
                          <TextInput label="Storage" placeholder="Storage" mt="md" value={systemRequirements.linux.recommended.storage} onChange={(e) => handleChange(e, "linux", "recommended", "storage")} />
                          <TextInput label="Direct X" placeholder="Direct X" mt="md" value={systemRequirements.linux.recommended.directX} onChange={(e) => handleChange(e, "linux", "recommended", "directX")} />
                          <TextInput label="Other" placeholder="Other" mt="md" value={systemRequirements.linux.recommended.other} onChange={(e) => handleChange(e, "linux", "recommended", "other")} />
                        </Fieldset>
                      </div>
                    </div>
                  </Fieldset>
                </div>
              )}
              <div className="row">
                <div className="col-4">
                  <TextInput
                    label="Additional Notes"
                    placeholder="Additional Notes"
                    value={systemRequirements.additionalNotes}
                    onChange={(e) =>
                      setSystemRequirements((prev) => ({
                        ...prev,
                        additionalNotes: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-4">
                  <TagsInput
                    label="Accounts Required (Press Enter to submit)"
                    placeholder="Accounts Required"
                    value={systemRequirements.loginAccountsRequired}
                    onChange={(value) =>
                      setSystemRequirements((prev) => ({
                        ...prev,
                        loginAccountsRequired: value,
                      }))
                    }
                    clearable
                  />
                </div>
                <div className="col-4">
                  <MultiSelect
                    label="Languages Supported"
                    placeholder="Pick Language"
                    data={languages.map((item) => ({
                      value: item._id,
                      label: item.language,
                    }))}
                    value={systemRequirements.languagesSupported}
                    onChange={(value) =>
                      setSystemRequirements((prev) => ({
                        ...prev,
                        languagesSupported: value,
                      }))
                    }
                    clearable
                    searchable
                  />
                </div>
              </div>
            </div>
          )}
          <div className="d-flex flex-column gap-2">
            <label htmlFor="cover-images">Cover Images</label>
            <Dropzone onDrop={uploadCoverImages} onReject={(files) => console.log("rejected files", files)} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <FaUpload style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <MdClose style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <FaImages style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag cover images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <div className="row">{coverImages}</div>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="images">Images</label>
            <Dropzone onDrop={uploadImages} onReject={(files) => console.log("rejected files", files)} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <FaUpload style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <MdClose style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                </Dropzone.Reject>
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
            <div className="row">{images}</div>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="videos">Videos</label>
            <Dropzone onDrop={uploadVideos} onReject={(files) => console.log("rejected files", files)} maxSize={200 * 1024 ** 2} accept={[MIME_TYPES.mp4]} {...props}>
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <FaUpload style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <MdClose style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <FaVideo style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag videos here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 2gb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <div className="row">{videos}</div>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="file-download">File Download</label>
            <Dropzone onDrop={uploadFileDownload} onReject={(files) => console.log("rejected files", files)} {...props}>
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <FaUpload style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <MdClose style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <FaDownload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
                </Dropzone.Idle>
                <div>
                  <Text size="xl" inline>
                    Drag file game download here or click to select files
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <div className="row">
              <div className="mt-2">
                <a href={game.fileDownload.path} download>
                  {game.fileDownload.path}
                </a>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="price">Price</label>
            <NumberInput placeholder="Price" prefix="Rp" mb="xl" size="md" id="price" allowNegative={false} thousandSeparator="," value={game.price} onChange={(value) => setGame((prevGame) => ({ ...prevGame, price: value }))} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25" onClick={handleCreateGame}>
              Add Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGame;

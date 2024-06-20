import { RichTextEditor as MantineEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import { IconColorPicker } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import { InputLabel, InputError } from "@mantine/core";

import "@mantine/tiptap/styles.css";

interface IRichTextEditor {
    placeholder: string;
    label: string;
    onChange: (s: string) => void;
    error?: string;
}

const RichTextEditor: React.FC<IRichTextEditor> = ({
    placeholder,
    label,
    onChange,
    error,
}) => {
    const editor = useEditor({
        onUpdate: (e) => {
            onChange(e.editor.getHTML());
        },
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder }),
        ],
    });

    return (
        <>
            <InputLabel>{label}</InputLabel>
            <MantineEditor
                editor={editor}
                style={{
                    border: error && "1px solid var(--mantine-color-error)",
                }}
            >
                <MantineEditor.Toolbar sticky stickyOffset={60}>
                    <MantineEditor.ColorPicker
                        colors={[
                            "#25262b",
                            "#868e96",
                            "#fa5252",
                            "#e64980",
                            "#be4bdb",
                            "#7950f2",
                            "#4c6ef5",
                            "#228be6",
                            "#15aabf",
                            "#12b886",
                            "#40c057",
                            "#82c91e",
                            "#fab005",
                            "#fd7e14",
                        ]}
                    />

                    <MantineEditor.ControlsGroup>
                        <MantineEditor.Control interactive={false}>
                            <IconColorPicker size="1rem" stroke={1.5} />
                        </MantineEditor.Control>
                        <MantineEditor.Color color="#F03E3E" />
                        <MantineEditor.Color color="#7048E8" />
                        <MantineEditor.Color color="#1098AD" />
                        <MantineEditor.Color color="#37B24D" />
                        <MantineEditor.Color color="#F59F00" />
                    </MantineEditor.ControlsGroup>
                    <MantineEditor.ControlsGroup>
                        <MantineEditor.Bold />
                        <MantineEditor.Italic />
                        <MantineEditor.Underline />
                        <MantineEditor.Strikethrough />
                        <MantineEditor.ClearFormatting />
                        <MantineEditor.Highlight />
                        <MantineEditor.Code />
                    </MantineEditor.ControlsGroup>

                    <MantineEditor.ControlsGroup>
                        <MantineEditor.H1 />
                        <MantineEditor.H2 />
                        <MantineEditor.H3 />
                        <MantineEditor.H4 />
                    </MantineEditor.ControlsGroup>

                    <MantineEditor.ControlsGroup>
                        <MantineEditor.Blockquote />
                        <MantineEditor.Hr />
                        <MantineEditor.BulletList />
                        <MantineEditor.OrderedList />
                        <MantineEditor.Subscript />
                        <MantineEditor.Superscript />
                    </MantineEditor.ControlsGroup>

                    <MantineEditor.ControlsGroup>
                        <MantineEditor.Link />
                        <MantineEditor.Unlink />
                    </MantineEditor.ControlsGroup>

                    <MantineEditor.ControlsGroup>
                        <MantineEditor.AlignLeft />
                        <MantineEditor.AlignCenter />
                        <MantineEditor.AlignJustify />
                        <MantineEditor.AlignRight />
                    </MantineEditor.ControlsGroup>

                    <MantineEditor.ControlsGroup>
                        <MantineEditor.Undo />
                        <MantineEditor.Redo />
                    </MantineEditor.ControlsGroup>
                </MantineEditor.Toolbar>

                <MantineEditor.Content />
            </MantineEditor>
            {error && <InputError>{error}</InputError>}
        </>
    );
};

export default RichTextEditor;

import React from 'react';
import axios from 'services/axios.service';
import ReactQuill, { Quill } from 'react-quill';
import compressImage from 'services/compress.service';
import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import { IRichTextEditor } from 'types';
import 'react-quill/dist/quill.snow.css';
import { message } from 'antd';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);

const RichTextEditor = ({ handleEditorChange }: IRichTextEditor): React.ReactElement => {
  const editorRef = React.useRef(null);

  const handleEditorUploadImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file: any = input.files[0];
      compressImage(file, (err, compressImage) => {
        if (err) {
          message.error('Nén hình thất bại');
        } else {
          const bodyFormData = new FormData();
          bodyFormData.append('file', compressImage);
          axios
            .post('/upload', bodyFormData)
            .then((response) => {
              const range = editorRef.current.getEditorSelection();
              console.log(range);
              editorRef.current.getEditor().insertEmbed(range.index, 'image', response.data.url);
              message.success('Upload hình thành công');
            })
            .catch(() => {
              message.error('Upload hình thất bại');
            });
        }
      });
    };
  };
  return (
    <ReactQuill
      onChange={handleEditorChange}
      ref={(el) => {
        editorRef.current = el;
      }}
      modules={{
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
          handlers: {
            image: handleEditorUploadImage,
          },
        },
        imageResize: {
          parchment: Quill.import('parchment'),
          modules: ['Resize', 'DisplaySize'],
        },
        blotFormatter: {},
      }}
    />
  );
};

export default RichTextEditor;

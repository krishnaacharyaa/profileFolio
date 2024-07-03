import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import 'github-markdown-css/github-markdown.css';

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
    const [renderedMarkdown, setRenderedMarkdown] = useState('');

    useEffect(() => {
        const md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true,
            breaks: true,
        });

        setRenderedMarkdown(md.render(markdown));
    }, [markdown]);

    return (
        <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
        />
    );
};

export default MarkdownPreview;
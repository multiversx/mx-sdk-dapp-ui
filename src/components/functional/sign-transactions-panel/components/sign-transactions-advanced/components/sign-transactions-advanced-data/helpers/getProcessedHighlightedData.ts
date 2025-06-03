import type { IDataHightlight } from '../sign-transactions-advanced-data';

interface IGetProcessedHighlightedData {
  data: string;
  highlightedData: string;
}

export const getProcessedHighlightedData = ({
  data,
  highlightedData,
}: IGetProcessedHighlightedData): IDataHightlight => {
  const highlightIndex = data.indexOf(highlightedData);
  const beforeHighlight = data.slice(0, highlightIndex);
  const highlight = data.slice(highlightIndex, highlightIndex + highlightedData.length);
  const afterHighlight = data.slice(highlightIndex + highlight.length);

  return {
    beforeHighlight,
    highlight,
    afterHighlight,
  };
};

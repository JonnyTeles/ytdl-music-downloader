type Props = {
  progress: React.CSSProperties["width"];
};

const Loading: React.FC<Props> = ({ progress }) => (
  <div
    className="h-1 bg-redytb transition-all duration-200 mt-1 rounded"
    style={{ width: `${progress}%` }}
  />
);

export default Loading;

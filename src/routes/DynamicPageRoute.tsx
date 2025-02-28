import React from "react";
import { useParams } from "react-router-dom";
import DynamicPage from "@/components/DynamicPage";

const DynamicPageRoute: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();

  return <DynamicPage pageId={pageId} />;
};

export default DynamicPageRoute;

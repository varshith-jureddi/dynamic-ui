import Page from "@/components/ui/Page";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Metric from "@/components/ui/Metric";
import StatGrid from "@/components/ui/StatGrid";
import Progress from "@/components/ui/Progress";
import Status from "@/components/ui/Status";
import Table from "@/components/ui/Table";
import Chart from "@/components/ui/Chart";
import Text from "@/components/ui/Text";
import Heading from "@/components/ui/Heading";
import List from "@/components/ui/List";
import Timeline from "@/components/ui/Timeline";
import Tabs from "@/components/ui/Tabs";
import ActivityFeed from "@/components/ui/ActivityFeed";
import Insight from "@/components/ui/Insight";

export const componentRegistry = { page: Page, section: Section, card: Card, metric: Metric, statGrid: StatGrid, progress: Progress, status: Status, table: Table, chart: Chart, text: Text, heading: Heading, list: List, timeline: Timeline, tabs: Tabs, activityFeed: ActivityFeed, insight: Insight } as const;
export type RegisteredComponentType = keyof typeof componentRegistry;
export function isRegisteredComponent(type: string): type is RegisteredComponentType { return type in componentRegistry; }

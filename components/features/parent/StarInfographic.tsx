import React from 'react';
import { SituationIcon, TaskIcon, ActionIcon, ResultIcon } from './StarMethodDiagramIcons';

interface InfoCardProps {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    letter: string;
    title: string;
    description: string;
    colorClasses: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ Icon, letter, title, description, colorClasses }) => (
    <div className={`p-4 rounded-lg flex items-start space-x-4 ${colorClasses}`}>
        <div className="flex-shrink-0">
            <Icon className="w-8 h-8" />
        </div>
        <div>
            <h4 className="font-display font-bold text-lg">{letter} - {title}</h4>
            <p className="text-sm opacity-90">{description}</p>
        </div>
    </div>
);

const StarInfographic: React.FC = () => {
    return (
        <div className="mb-6 space-y-4">
            <h3 className="font-semibold text-lg text-foreground">The STAR Method at a Glance:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                    Icon={SituationIcon}
                    letter="S"
                    title="Situation"
                    description="The context. Ask: 'Where were you?'"
                    colorClasses="bg-primary/10 text-primary"
                />
                <InfoCard
                    Icon={TaskIcon}
                    letter="T"
                    title="Task"
                    description="The goal. Ask: 'What did you need to do?'"
                    colorClasses="bg-accent/10 text-accent"
                />
                <InfoCard
                    Icon={ActionIcon}
                    letter="A"
                    title="Action"
                    description="The steps taken. Ask: 'What were your specific actions?'"
                    colorClasses="bg-success/10 text-success"
                />
                <InfoCard
                    Icon={ResultIcon}
                    letter="R"
                    title="Result"
                    description="The outcome. Ask: 'What was the result?'"
                    colorClasses="bg-warning/10 text-warning"
                />
            </div>
        </div>
    );
};

export default StarInfographic;
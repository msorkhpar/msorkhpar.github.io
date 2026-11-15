import React, { Fragment, useState } from 'react';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

// Every logo in public/logos is a 450x250 (9:5) image, capped at the column's width like
// any image; the fallback tile takes the same shape and the same cap.
const LOGO_SIZE = 'h-[3rem] lg:h-[3.5rem] xl:h-[4rem] 2xl:h-[4.5rem]';

/**
 * The company's logo, or a tile with its initials when there is no logo or the
 * image fails to load, so a missing file never shows the browser's broken icon.
 */
const CompanyLogo = ({ logo, name }: { logo?: string; name?: string }) => {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={name ? `${name} logo` : ''}
        className={LOGO_SIZE}
        onError={() => setFailed(true)}
      />
    );
  }
  if (!name) {
    return null;
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <div
      className={`${LOGO_SIZE} aspect-[9/5] max-w-full flex items-center justify-center rounded-box bg-primary/10 text-primary font-bold text-xl`}
      title={name}
      aria-label={name}
    >
      {initials}
    </div>
  );
};

const ListItem = ({
  time,
  position,
  company,
  companyName,
  companyLink,
  logo,
  achievements,
}: {
  time: React.ReactNode;
  position?: React.ReactNode;
  company?: React.ReactNode;
  companyName?: string;
  companyLink?: string;
  logo?: string;
  achievements?: Array<string>;
}) => (
  <li className="mb-5 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-9 2xl:grid-cols-9">
    <div className="col-span-1 p-1 mr-3 flex items-center">
      <a
        href={companyLink}
        target="_blank"
        rel="noreferrer"
        className="min-w-0"
      >
        <CompanyLogo logo={logo} name={companyName} />
      </a>
    </div>
    <div className="col-span-1 md:col-span-5 lg:col-span-5 xl:col-span-8 2xl:col-span-8">
      <div className="my-0.5 text-xs">{time}</div>
      <h3 className="font-extrabold mt-1"> {position}</h3>
      <div className="mb-1 font-semibold">{company}</div>
      <div>
        {achievements &&
          achievements.map((achievement, index) => (
            <p className="mb-0.5" key={index}>
              • {achievement}
            </p>
          ))}
      </div>
    </div>
  </li>
);

const ExperienceCard = ({
  experiences,
  loading,
}: {
  experiences: SanitizedExperience[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          time={skeleton({
            widthCls: 'w-5/12',
            heightCls: 'h-4',
          })}
          position={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          company={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />,
      );
    }

    return array;
  };
  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                Work Experience
              </span>
            )}
          </h5>
        </div>
        <div className="text-base-content/85">
          <ol className="relative border-base-300 border-opacity-30 my-2 mx-4">
            {loading ? (
              renderSkeleton()
            ) : (
              <Fragment>
                {experiences.map((experience, index) => (
                  <ListItem
                    key={index}
                    time={`${experience.from} - ${experience.to}`}
                    position={experience.position}
                    company={experience.company}
                    companyName={experience.company}
                    companyLink={
                      experience.companyLink
                        ? experience.companyLink
                        : undefined
                    }
                    logo={experience.logo}
                    achievements={experience.achievements}
                  />
                ))}
              </Fragment>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;

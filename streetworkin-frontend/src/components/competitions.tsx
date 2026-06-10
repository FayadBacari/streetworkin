// Import styles
import "./ui/competitions.scss";


type OneStreetWorkoutCompetition = {
  // Date shown in big letters (e.g. "19 SEPT 2026").
  competitionDateText: string;
  competitionEventName: string;
  // Address line shown under the name (e.g. "Sevran, 93270 Sevran, France").
  competitionLocationAddress: string;
};


// Inline SVG icons (calendar and pin). No external icon library used.
// `fill="currentColor"` → icon color is inherited from its parent.
const SVG_ICON_FOR_CALENDAR = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
  </svg>
);

const SVG_ICON_FOR_LOCATION_PIN = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);


// TODO: replace these placeholder competitions with the real StreetWork'in events.
const LIST_OF_UPCOMING_COMPETITIONS: OneStreetWorkoutCompetition[] = [
  {
    competitionDateText: "19 sept 2026",
    competitionEventName: "FNSL France Master",
    competitionLocationAddress: "Sevran, 93270 Sevran, France",
  },
  {
    competitionDateText: "30 oct 2026",
    competitionEventName: "FNSL France Nouvelle Génération",
    competitionLocationAddress: "Sevran, 93270 Sevran, France",
  },
  {
    competitionDateText: "05 déc 2026",
    competitionEventName: "FNSL MU Only",
    competitionLocationAddress: "Tremblay-en-France, France",
  },
];


export default function Competitions() {
  return (
    <section id="events" className="competitions">
      <span className="competitions__separator" aria-hidden="true" />

      <h2 className="competitions__heading">
        Prochaines{" "}
        <span className="competitions__heading-accent">Compétitions</span>
      </h2>

      <p className="competitions__intro">
        Participez aux événements officiels de Street Workout organisés par
        StreetWork&apos;in.
      </p>

      <div className="competitions__grid">
        {LIST_OF_UPCOMING_COMPETITIONS.map(function (oneCompetitionToShow) {
          return (
            <article
              key={oneCompetitionToShow.competitionEventName}
              className="competitions__card"
            >
              <header className="competitions__card-date">
                <span className="competitions__card-icon">{SVG_ICON_FOR_CALENDAR}</span>
                {oneCompetitionToShow.competitionDateText}
              </header>
              <div className="competitions__card-body">
                <h4 className="competitions__card-name">
                  {oneCompetitionToShow.competitionEventName}
                </h4>
                <p className="competitions__card-location">
                  <span className="competitions__card-icon">{SVG_ICON_FOR_LOCATION_PIN}</span>
                  {oneCompetitionToShow.competitionLocationAddress}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

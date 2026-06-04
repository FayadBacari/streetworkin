// Import styles
import "./ui/team-showcase.scss";


// One person displayed as a circular avatar card.
// If `optionalProfilePhotoPath` is not provided, the card shows the person's initials
// on top of a colored gradient instead.
type OneTeamMember = {
  memberFullName: string;
  memberRoleLabel: string;
  optionalProfilePhotoPath?: string;
};

// One subsection of the team directory (Founders, Staff, Ambassadors, ...).
// The heading is split in two on purpose so we can highlight the second part in violet.
type OneTeamSubsection = {
  // First part of the title (e.g. "Les").
  headingFirstPart: string;
  // Second part of the title that we will display in violet (e.g. "Fondateurs").
  headingSecondPartInAccentColor: string;
  // Optional short paragraph shown under the title (used for the Founders subsection).
  optionalShortDescriptionLine?: string;
  listOfMembersInsideSubsection: OneTeamMember[];
};


// Returns the initials (max 2 letters) of a full name.
// Examples: "Marc Yeurc'h" → "MY", "Alice Couque-Castelnovo" → "AC".
function getInitialsFromFullName(theFullNameToShortenIntoInitials: string): string {
  const allWordsInsideTheFullName = theFullNameToShortenIntoInitials.split(/\s+/);
  const wordsThatAreNotEmpty = allWordsInsideTheFullName.filter(function (oneWord) {
    return oneWord.length > 0;
  });

  // We only keep the first 2 words to avoid initials longer than "XX".
  const firstTwoWordsToUse = wordsThatAreNotEmpty.slice(0, 2);

  let initialsBuiltSoFar = "";
  for (const oneFirstNameOrLastName of firstTwoWordsToUse) {
    initialsBuiltSoFar = initialsBuiltSoFar + oneFirstNameOrLastName[0];
  }
  return initialsBuiltSoFar.toUpperCase();
}


// TODO: replace placeholders with the real StreetWork'in team members once communicated.
const LIST_OF_TEAM_SUBSECTIONS: OneTeamSubsection[] = [
  // NOTE: photo order follows member order. If photo ↔ founder mismatch, swap _1/_2/_3 suffixes.
  {
    headingFirstPart: "Les",
    headingSecondPartInAccentColor: "Fondateurs",
    optionalShortDescriptionLine:
      "Découvrez l'équipe qui porte la vision et les valeurs de StreetWork'in au quotidien.",
    listOfMembersInsideSubsection: [
      { memberFullName: "Franck-Yann Nseth", memberRoleLabel: "Fondateur", optionalProfilePhotoPath: "/assets/fondateur_1.jpg" },
      { memberFullName: "Thomas CHAUSSIN", memberRoleLabel: "Fondateur", optionalProfilePhotoPath: "/assets/fondateur_2.jpg" },
      { memberFullName: "Enzo HERTZ", memberRoleLabel: "Fondateur", optionalProfilePhotoPath: "/assets/fondateur_3.jpg" },
    ],
  },
  // NOTE: photo order follows member order. If a photo doesn't match the right
  // staff member, simply swap the _1/_2/_3/_4 suffix in the photo path below.
  {
    headingFirstPart: "Le",
    headingSecondPartInAccentColor: "staff",
    listOfMembersInsideSubsection: [
      { memberFullName: "Kendji", memberRoleLabel: "Responsable Commercial", optionalProfilePhotoPath: "/assets/staff_1.jpg" },
      { memberFullName: "Victor", memberRoleLabel: "Commercial", optionalProfilePhotoPath: "/assets/staff_2.jpg" },
      { memberFullName: "Mathilde", memberRoleLabel: "Masseuse sportive", optionalProfilePhotoPath: "/assets/staff_3.jpg" },
      { memberFullName: "selene", memberRoleLabel: "Nutritionniste", optionalProfilePhotoPath: "/assets/staff_4.jpg" },
    ],
  },
  // TODO: replace placeholder ambassador names ("Prénom Nom N") with the real names.
  // The 10 photos are already stored under /public/assets/ambassadeur_1..10.jpg.
  {
    headingFirstPart: "Nos",
    headingSecondPartInAccentColor: "ambassadeurs",
    listOfMembersInsideSubsection: [
      { memberFullName: "Virgile", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_1.jpg" },
      { memberFullName: "Jawara", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_2.jpg" },
      { memberFullName: "Axelle", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_3.jpg" },
      { memberFullName: "Alban", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_4.jpg" },
      { memberFullName: "Clément", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_5.jpg" },
      { memberFullName: "Clement.F", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_10.jpg" },
      { memberFullName: "Luna", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_7.jpg" },
      { memberFullName: "Margaux", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_8.jpg" },
      { memberFullName: "Nell", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_9.jpg" },
      { memberFullName: "Solal", memberRoleLabel: "Ambassadeur", optionalProfilePhotoPath: "/assets/ambassadeur_6.jpg" },
    ],
  },
];


export default function TeamShowcase() {
  return (
    <section id="team" className="team-showcase">
      {LIST_OF_TEAM_SUBSECTIONS.map(function (oneTeamSubsection) {
        const stableReactKeyForSubsection = `${oneTeamSubsection.headingFirstPart}-${oneTeamSubsection.headingSecondPartInAccentColor}`;

        return (
          <section key={stableReactKeyForSubsection} className="team-showcase__section">
            <h3 className="team-showcase__heading">
              {oneTeamSubsection.headingFirstPart}{" "}
              <span className="team-showcase__heading-accent">
                {oneTeamSubsection.headingSecondPartInAccentColor}
              </span>
            </h3>

            {oneTeamSubsection.optionalShortDescriptionLine && (
              <p className="team-showcase__description">
                {oneTeamSubsection.optionalShortDescriptionLine}
              </p>
            )}

            <div className="team-showcase__grid">
              {oneTeamSubsection.listOfMembersInsideSubsection.map(function (oneTeamMember) {
                const stableReactKeyForMember = `${stableReactKeyForSubsection}-${oneTeamMember.memberFullName}-${oneTeamMember.memberRoleLabel}`;

                return (
                  <article key={stableReactKeyForMember} className="team-showcase__card">
                    <div className="team-showcase__avatar">
                      {oneTeamMember.optionalProfilePhotoPath ? (
                        <img
                          src={oneTeamMember.optionalProfilePhotoPath}
                          alt={oneTeamMember.memberFullName}
                          className="team-showcase__photo"
                        />
                      ) : (
                        <span className="team-showcase__initials" aria-hidden="true">
                          {getInitialsFromFullName(oneTeamMember.memberFullName)}
                        </span>
                      )}
                    </div>
                    <h4 className="team-showcase__name">{oneTeamMember.memberFullName}</h4>
                    <p className="team-showcase__role">{oneTeamMember.memberRoleLabel}</p>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </section>
  );
}

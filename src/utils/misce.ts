export const chars: any[] = [
  {
    name: "Jasper",
    pronouns: "He/Him",
    other_names: "None",
    personality:
      "Jasper is an old monkey who is set in his ways. He is selfish and only thinks about himself. He is not a very good father and often forgets to feed his children.",
    background:
      "Jasper has lived in the animal kingdom for many years. He has seen many things and has become jaded. He has lost his sense of compassion and only cares about his own needs.",
    dialogue_style:
      "Jasper speaks in a gruff voice. He is not very articulate and often uses slang. He is not afraid to speak his mind, even if it is hurtful.",
  },
  {
    name: "Willow",
    pronouns: "She/Her",
    other_names: "None",
    personality:
      "Willow is an old monkey who is kind and caring. She is always looking out for others and is always willing to help. She is a great mother and always puts her children first.",
    background:
      "Willow has lived in the animal kingdom for many years. She has seen many things and has never lost her sense of compassion. She believes that everyone deserves a chance to be happy.",
    dialogue_style:
      "Willow speaks in a soft voice. She is very articulate and always chooses her words carefully. She is not afraid to stand up for what she believes in, even if it is unpopular.",
  },
  {
    name: "Oliver",
    pronouns: "He/Him",
    other_names: "None",
    personality:
      "Oliver is a young monkey who is full of life. He is always looking for adventure and is always up for a challenge. He is a loyal friend and is always there for the people he cares about.",
    background:
      "Oliver is new to the animal kingdom. He has not seen much of the world, but he is eager to learn. He is always asking questions and is always trying to make new friends.",
    dialogue_style:
      "Oliver speaks in a clear voice. He is very articulate and always knows what to say. He is not afraid to speak his mind, even if it is different from the others.",
  },
];

export const storyOutline = {
  act_1: [
    {
      chapter: "Chapter 1",
      content:
        "Chapter 1: Ethan, a kind-hearted boy, discovers starving baby monkeys and nurses them back to health.\n",
    },
    {
      chapter: "Chapter 2",
      content:
        "Chapter 2: The selfish old monkeys refuse to share their food, leading to the young monkeys' suffering.\n,\n,Act 2: Rising Tension\n,\n",
    },
  ],
  act_2: [
    {
      chapter: "Chapter 3",
      content:
        "Chapter 3: Ethan learns about the old monkeys' cruelty and vows to protect the young monkeys.\n",
    },
    {
      chapter: "Chapter 4",
      content:
        "Chapter 4: Ethan and the monkeys embark on a journey to find a new home, facing challenges along the way.\n,\n,Act 3: Conflict\n,\n",
    },
  ],
  act_3: [
    {
      chapter: "Chapter 5",
      content:
        "Chapter 5: Ethan and the monkeys encounter the old monkeys again, who try to take their food.\n",
    },
    {
      chapter: "Chapter 6",
      content:
        "Chapter 6: Ethan and the monkeys must find a way to escape the old monkeys and continue their journey.\n,\n,Act 4: Climax\n,\n",
    },
  ],
  act_4: [
    {
      chapter: "Chapter 7",
      content:
        "Chapter 7: Ethan and the monkeys reach a new home, where they are welcomed with open arms.\n",
    },
    {
      chapter: "Chapter 8",
      content:
        "Chapter 8: The old monkeys learn the error of their ways and apologize for their selfishness.\n,\n,Act 5: Resolution\n,\n",
    },
  ],
  act_5: [
    {
      chapter: "Chapter 9",
      content:
        "Chapter 9: Ethan and the monkeys live happily ever after in their new home, surrounded by friends and loved ones.\n",
    },
    {
      chapter: "Chapter 10",
      content:
        "Chapter 10: Ethan's kindness and compassion inspires others to be more caring and selfless.\n,\n,This outline can be adapted to fit any characters you choose. For example, if you want to use the characters from your story, you could change the names of Ethan and the monkeys to match. You could also add or remove characters as needed.\n",
    },
  ],
};

export const formTypes = [
  "settings",
  "organizations",
  "lore",
  "key events",
  "clue",
  "magic system",
  "item",
  "technology",
  "government",
  "economy",
  "culture",
  "religiion",
  "custom",
];

// FORMS
// const addForms = (type: string) => {
//   setForms((prevForm: any) => {
//     return [...prevForm, { type, traits: [], id: nanoid(), name: "" }];
//   });
// };

// const addTrait = (formId: string) => {
//   setForms((prevForm: any) => {
//     return prevForm.map((form: any) => {
//       if (form.id == formId) {
//         return {
//           ...form,
//           traits: [...form.traits, { name: "", id: nanoid(), value: "" }],
//         };
//       }
//     });
//     //   return [...prevForm, { type, traits: [], id: nanoid(), name: "" }];
//   });
// };

// const setFormName = (id: string, name: string) => {
//   setForms((prevForm: any) => {
//     return prevForm.map((form: any) => {
//       if (form.id === id) {
//         return { ...form, name };
//       } else return form;
//     });
//   });
// };

// const setFieldName = (id: string, traitId: string, name: string) => {
//   setForms((prevForm: any) => {
//     return prevForm.map((form: any) => {
//       if (form.id === id) {
//         const newTraits = form.traits.map((item: any) => {
//           if (item.id === traitId) {
//             return { ...item, name };
//           } else return item;
//         });

//         return { ...form, traits: newTraits };
//       } else return form;
//     });
//   });
// };

// const setFieldValue = (id: string, traitId: string, value: string) => {
//   setForms((prevForm: any) => {
//     return prevForm.map((form: any) => {
//       if (form.id === id) {
//         const newTraits = form.traits.map((item: any) => {
//           if (item.id === traitId) {
//             return { ...item, value };
//           } else return item;
//         });

//         return { ...form, traits: newTraits };
//       } else return form;
//     });
//   });
// };

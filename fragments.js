/*
  Narrative map:
  Act 1: The Mask - cute site, fast replies, high-score normality.
  Act 2: The Cracks - games begin describing numbness and memory gaps.
  Act 3: The Room - the bedroom/site becomes a witness.
  Act 4: The Void - falling, dissociation, no bottom, no answer.
  Act 5: The Small Voice - not a cure, only presence enough for one more night.

  Safety: the story references surviving emotional collapse and an attempt indirectly.
  It avoids method, gore, instruction, or romanticizing death. The horror is having to act normal afterward.
*/

window.SUNNY_STATES = ["SUNNY", "WRONG", "SORE", "ORGANIC", "HOLLOW", "VOID", "UNDERNEATH"];

window.SUNNY_FRAGMENTS = [
  {
    id: "fine",
    order: 1,
    act: "Act 1: The Mask",
    visible: "fine",
    title: "status_auto_reply.txt",
    reveal: "fine is the password I use when I need the room to stop asking",
    theme: "fake normality",
    location: "welcome",
    corruptionLevel: 1,
    line: "I said fine so many times the word started answering without me"
  },
  {
    id: "play",
    order: 2,
    act: "Act 1: The Mask",
    visible: "Play",
    title: "continue_button.log",
    reveal: "I clicked continue because I did not know what else to press",
    theme: "automatic survival",
    location: "game buttons",
    corruptionLevel: 1,
    line: "continue was not courage, it was the only button left"
  },
  {
    id: "login",
    order: 2.5,
    act: "Act 1: The Site",
    visible: "LOGIN",
    title: "account_recovery_note.txt",
    reveal: "the password was not a word; it was how well I lied",
    theme: "gateway",
    location: "Login",
    corruptionLevel: 1,
    line: "the login page was asking for confession, not credentials"
  },
  {
    id: "score",
    order: 3,
    act: "Act 1: The Mask",
    visible: "HIGH SCORE",
    title: "high_score_table.dat",
    reveal: "my best performance was looking normal",
    theme: "performance",
    location: "fake games",
    corruptionLevel: 1,
    line: "my best score was convincing everyone I was still easy to love"
  },
  {
    id: "believes",
    order: 4,
    act: "Act 1: The Mask",
    visible: "believes",
    title: "messagehero_autoreply.txt",
    reveal: "they loved the version that answered fast",
    theme: "mask believed",
    location: "Message Hero",
    corruptionLevel: 2,
    line: "they believed the version of me that loaded before the truth"
  },
  {
    id: "sunny",
    order: 5,
    act: "Act 2: The Cracks",
    visible: "Sunny",
    title: "site_name_reason.txt",
    reveal: "the room was never sunny; I named it that so nobody would ask",
    theme: "false brightness",
    location: "header",
    corruptionLevel: 2,
    line: "I painted the archive yellow because the room would not stop being dark"
  },
  {
    id: "loading",
    order: 6,
    act: "Act 2: The Cracks",
    visible: "LOADING",
    title: "loading_never_finished.tmp",
    reveal: "I am still waiting to feel like I came back",
    theme: "dissociation",
    location: "game windows",
    corruptionLevel: 2,
    line: "something survived, but I kept waiting for it to feel like me"
  },
  {
    id: "health",
    order: 6.5,
    act: "Act 3: The Body",
    visible: "HEALTH",
    title: "body_normalizer.status",
    reveal: "the body reported normal. the boy did not",
    theme: "body as evidence",
    location: "Body Normalizer",
    corruptionLevel: 3,
    line: "normal was a costume the body learned to wear without asking me"
  },
  {
    id: "mess",
    order: 7,
    act: "Act 2: The Cracks",
    visible: "mess",
    title: "cleanroom_hidden_object.txt",
    reveal: "the mess counter goes up when I clean because the mess was never on the floor",
    theme: "concealment",
    location: "Clean Room Rush",
    corruptionLevel: 2,
    line: "I hid the evidence and became evidence-shaped"
  },
  {
    id: "easy",
    order: 8,
    act: "Act 2: The Cracks",
    visible: "easy",
    title: "patch_note_draft_08.txt",
    reveal: "easy means I can say it without changing my face",
    theme: "social script",
    location: "Patch notes",
    corruptionLevel: 2,
    line: "the easiest lie was the one everyone wanted to finish for me"
  },
  {
    id: "room",
    order: 9,
    act: "Act 3: The Room",
    visible: "room",
    title: "room_bug_final_final.txt",
    reveal: "the walls learned my real name before anyone else did",
    theme: "witness",
    location: "Lost files",
    corruptionLevel: 3,
    line: "the room did not save me, but it remembered the part that could not speak"
  },
  {
    id: "mouth",
    order: 10,
    act: "Act 3: The Room",
    visible: "mouth",
    title: "thumbnail_404_note.txt",
    reveal: "the room saves what the mouth deletes",
    theme: "unsaid truth",
    location: "Lost files",
    corruptionLevel: 3,
    line: "my mouth deleted the sentence and the room kept a backup"
  },
  {
    id: "noticed",
    order: 11,
    act: "Act 3: The Room",
    visible: "noticed",
    title: "guestbook_deleted_entry.txt",
    reveal: "the terrifying part was being found after becoming good at not being seen",
    theme: "fear of being found",
    location: "Guestbook",
    corruptionLevel: 3,
    line: "being found felt like light and accusation at the same time"
  },
  {
    id: "shame",
    order: 12,
    act: "Act 3: The Room",
    visible: "sorry",
    title: "apology_loop.txt",
    reveal: "I felt ashamed of being alive and ashamed of almost not being",
    theme: "shame",
    location: "Picnic Panic",
    corruptionLevel: 3,
    line: "I apologized for surviving like I had broken a rule"
  },
  {
    id: "question",
    order: 13,
    act: "Act 4: The Void",
    visible: "final question",
    title: "meaningmachine_lock.txt",
    reveal: "people asked why, but I was asking the same thing from farther down",
    theme: "why",
    location: "The Meaning Machine",
    corruptionLevel: 4,
    line: "why did I stay was not a question with a voice yet"
  },
  {
    id: "void",
    order: 14,
    act: "Act 4: The Void",
    visible: "VOID",
    title: "bottomless_runner.cache",
    reveal: "falling is not loud; it is the absence of anything stopping you",
    theme: "endless falling",
    location: "Bottomless Runner",
    corruptionLevel: 4,
    line: "I thought the bottom would explain the fall"
  },
  {
    id: "exit",
    order: 15,
    act: "Act 4: The Void",
    visible: "EXIT",
    title: "exit_map_broken.nav",
    reveal: "every exit led back to the same thought",
    theme: "loop",
    location: "modal buttons",
    corruptionLevel: 4,
    line: "every exit became another hallway shaped like me"
  },
  {
    id: "error",
    order: 16,
    act: "Act 4: The Void",
    visible: "ERROR",
    title: "return_failed.err",
    reveal: "something survived, but I do not know if it was me",
    theme: "dissociation",
    location: "fake error",
    corruptionLevel: 4,
    line: "I came back with my outline missing"
  },
  {
    id: "passar",
    order: 17,
    act: "Act 5: The Small Voice",
    visible: "vai passar",
    title: "phrase_that_did_not_work.txt",
    reveal: "vai passar sounded like a door closing until someone stayed beside it",
    theme: "dismissal and presence",
    location: "Patch notes",
    corruptionLevel: 5,
    line: "the words did not save me; the person who waited almost did"
  },
  {
    id: "silence",
    order: 18,
    act: "Act 5: The Small Voice",
    visible: "silence",
    title: "credits_hidden_line.txt",
    reveal: "my friends stayed near the silence without knowing its name",
    theme: "friendship",
    location: "Credits",
    corruptionLevel: 5,
    line: "maybe being heard begins before I can explain the sound"
  },
  {
    id: "wind",
    order: 18.2,
    act: "Act 2: The Cracks",
    visible: "wind",
    title: "picnicpanic_weather.tmp",
    reveal: "the wind took the normal day apart before I learned its shape",
    theme: "loss",
    location: "Picnic Panic card",
    corruptionLevel: 2,
    line: "some days fall apart gently enough that everyone calls it weather"
  },
  {
    id: "disappearing",
    order: 18.4,
    act: "Act 1: The Mask",
    visible: "me",
    title: "friend_contest_result.tmp",
    reveal: "I became good at leaving while still sitting there",
    theme: "absence",
    location: "Guestbook",
    corruptionLevel: 2,
    line: "my best trick was being present enough not to worry anyone"
  },
  {
    id: "everything",
    order: 18.6,
    act: "Act 3: The Room",
    visible: "everything",
    title: "archive_keeps_everything.log",
    reveal: "the archive keeps everything, even the version of me nobody invited",
    theme: "archive",
    location: "Lost files",
    corruptionLevel: 3,
    line: "nothing is gone just because I made it quiet"
  },
  {
    id: "playing",
    order: 18.8,
    act: "Act 1: The Mask",
    visible: "playing",
    title: "faq_question_03.txt",
    reveal: "if you win, nobody asks why you were playing",
    theme: "rules",
    location: "FAQ",
    corruptionLevel: 2,
    line: "games let pain become a task with edges"
  },
  {
    id: "patch-delay",
    order: 18.9,
    act: "Act 2: The Cracks",
    visible: "Read more",
    title: "delay_reason_private.txt",
    reveal: "the delay is not polish; it is the part of me that will not compile",
    theme: "broken build",
    location: "Patch notes",
    corruptionLevel: 2,
    line: "some builds fail because the developer is also the bug"
  },
  {
    id: "small-voice",
    order: 19,
    act: "Act 5: The Small Voice",
    visible: "voice",
    title: "outside_the_machine.txt",
    reveal: "the machine cannot tell you why to stay, but someone outside the machine might",
    theme: "presence",
    location: "Meaning Machine",
    corruptionLevel: 5,
    line: "a voice is not a floor, but it can interrupt the falling"
  },
  {
    id: "pretend",
    order: 20,
    act: "Act 1: The Mask",
    visible: "pretend",
    title: "storepage_rejected.txt",
    reveal: "pretending made a smaller room inside the room",
    theme: "mask",
    location: "Store mirrors",
    corruptionLevel: 2,
    line: "I pretended until pretending started pretending back"
  },
  {
    id: "smiles",
    order: 21,
    act: "Act 1: The Mask",
    visible: "I forgot how",
    title: "mascot_model_notes.txt",
    reveal: "the mascot smiles because I forgot how",
    theme: "mascot",
    location: "FAQ",
    corruptionLevel: 3,
    line: "the smile was not the boy; it was the lock"
  },
  {
    id: "mascot",
    order: 21.5,
    act: "Act 1: The Mask",
    visible: "mascot",
    title: "sunny_face_rig.txt",
    reveal: "please stop making me perform",
    theme: "forced smile",
    location: "Mascot",
    corruptionLevel: 3,
    line: "the mascot kept smiling because stopping would explain too much"
  },
  {
    id: "source",
    order: 22,
    act: "Act 3: The Room",
    visible: "Source",
    title: "source_not_code.txt",
    reveal: "view-source only shows the page, not what happened inside the person who made it",
    theme: "inspection",
    location: "Source button",
    corruptionLevel: 3,
    line: "do not inspect the room unless you are ready to be seen"
  },
  {
    id: "archive",
    order: 23,
    act: "Act 3: The Room",
    visible: "2008",
    title: "archive_mirror_2008.txt",
    reveal: "2008 is not a year here; it is a loose floorboard",
    theme: "hidden route",
    location: "Footer",
    corruptionLevel: 3,
    line: "the protected folder is where the site stops acting normal"
  },
  {
    id: "konami",
    order: 24,
    act: "Act 4: The Void",
    visible: "keys",
    title: "keyboard_prayer.tmp",
    reveal: "old cheat codes cannot skip the part where you wake up afterward",
    theme: "ritual",
    location: "Keyboard",
    corruptionLevel: 4,
    line: "the old spell opened a door and the door opened downward"
  },
  {
    id: "idle",
    order: 25,
    act: "Act 4: The Void",
    visible: "idle",
    title: "idle_timeout.txt",
    reveal: "when nobody moves, the room starts talking first",
    theme: "waiting",
    location: "Idle page",
    corruptionLevel: 4,
    line: "the quiet is not empty; it is watching to see if I return"
  },
  {
    id: "bug-report",
    order: 26,
    act: "Act 3: The Room",
    visible: "bug report",
    title: "submitted_without_network.txt",
    reveal: "the bug report was never sent, but the room read it",
    theme: "confession",
    location: "Bug report",
    corruptionLevel: 3,
    line: "I wrote the problem as if it belonged to the game"
  },
  {
    id: "meaning-machine",
    order: 27,
    act: "Act 4: The Void",
    visible: "The Meaning Machine",
    title: "meaningmachine_runtime_error.txt",
    reveal: "the machine cannot tell you why to stay, but someone outside the machine might",
    theme: "meaning",
    location: "Game window",
    corruptionLevel: 5,
    line: "the answer did not appear; the room only became less empty"
  }
];

window.SUNNY_GAMES = {
  picnic: {
    title: "Picnic Panic",
    crumb: "sunny_loader.exe",
    fragment: "shame",
    extraFragment: "play",
    buttonAfter: "Pretend",
    screen: [
      "COLLECT: sandwich, juice box, small blue kite",
      "item collected: sorry",
      "item collected: sorry",
      "item collected: sorry",
      "",
      "The basket is full. The day is still missing."
    ],
    response: "Every item becomes an apology before it reaches your hand."
  },
  message: {
    title: "Message Hero",
    crumb: "typing_test.swf",
    fragment: "score",
    extraFragment: "believes",
    buttonAfter: "Continue",
    screen: [
      "incoming: are you okay?",
      "correct answer: im fine",
      "incoming: really?",
      "correct answer: im fine",
      "incoming: you sure?",
      "correct answer: im fine",
      "",
      "HIGH SCORE: nobody noticed"
    ],
    response: "The game accepts only one answer. It keeps calling that success."
  },
  clean: {
    title: "Clean Room Rush",
    crumb: "room_sorter_beta.swf",
    fragment: "mess",
    extraFragment: "room",
    buttonAfter: "Again",
    screen: [
      "clean floor: +1 mess",
      "hide laundry: +4 mess",
      "delete draft: +9 mess",
      "smile before door opens: +27 mess",
      "",
      "mess counter overflow"
    ],
    response: "The cleaner the room gets, the more it remembers."
  },
  meaning: {
    title: "The Meaning Machine",
    crumb: "meaningmachine_locked.exe",
    fragment: "meaning-machine",
    extraFragment: "small-voice",
    buttonAfter: "Survive",
    screen: [
      "BOOTING MEANING MACHINE...",
      "input: why did I stay?",
      "output: question returned unanswered",
      "input: am I alive?",
      "output: not enough data",
      "input: what now?",
      "output: ask outside the machine",
      "",
      "the machine cannot tell you why to stay. but someone outside the machine might."
    ],
    response: "It never produces an answer. It only stops pretending questions are errors."
  },
  bottomless: {
    title: "Bottomless Runner",
    crumb: "void_runner_no_floor.swf",
    fragment: "void",
    extraFragment: "error",
    buttonAfter: "Not yet",
    screen: [
      "RUNNER STATUS: falling",
      "ground: not found",
      "score: time survived",
      "music: muted",
      "skybox: repeating",
      "",
      "there is no bottom element"
    ],
    response: "There is no jump button. There is only time."
  },
  body: {
    title: "Body Normalizer",
    crumb: "organic_status_panel.exe",
    fragment: "health",
    extraFragment: "loading",
    buttonAfter: "Survive",
    screen: [
      "pulse: normal",
      "breath: normal",
      "voice: normal",
      "face: normal",
      "hunger: normal",
      "sleep: normal",
      "",
      "log: normal is a costume the body learned"
    ],
    response: "The sliders all say normal. The interface keeps pressing outward."
  }
};

const codeHints = {
  "Act 1: The Site": "SUNNY",
  "Act 1: The Mask": "FINE",
  "Act 2: The Cracks": "ROOM",
  "Act 3: The Body": "ORGANIC",
  "Act 3: The Room": "ROOM",
  "Act 4: The Void": "VOID",
  "Act 5: The Small Voice": "STILLHERE",
  "Act 6: The Underneath": "UNDERNEATH"
};

window.SUNNY_FRAGMENTS.forEach((fragment) => {
  fragment.sourcePage = fragment.location;
  fragment.codeHint = fragment.codeHint || codeHints[fragment.act] || "UNDERNEATH";
  fragment.discovered = false;
});

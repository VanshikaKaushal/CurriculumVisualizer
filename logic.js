// Written by Abhi Sarkar

let courses = {
  "ENGR 1100": { prerequisites: [], postrequisites: ["CSE 2221"], corequisites: [] },
  "ENGR 1181": { prerequisites: [], postrequisites: ["ENGR 1182"], corequisites: [] },
  "ENGR 1182": { prerequisites: ["ENGR 1181"], postrequisites: [], corequisites: ["MATH 1151"] },
  "MATH 1151": { prerequisites: [], postrequisites: ["MATH 1172", "PHYSICS 1250", "MATH 2568", "CSE 2321", "ECE 2060"], corequisites: [] },
  "MATH 1172": { prerequisites: ["MATH 1151"], postrequisites: ["MATH 3345", "MATH 2568", "ECE 2020", "STAT 3470"], corequisites: [] },
  "MATH 3345": { prerequisites: ["MATH 1172", "CSE 2321"], postrequisites: [], corequisites: [] },
  "MATH 2568": { prerequisites: ["MATH 1172"], postrequisites: [], corequisites: [] },

  "PHYSICS 1250": { prerequisites: [], postrequisites: ["ECE 2020", "ECE 2060"], corequisites: ["MATH 1151"] },

  "ENGLISH 1110": { prerequisites: [], postrequisites: [] },
  "GE": { prerequisites: [], postrequisites: [], corequisites: [] },

  "CSE 1223": { prerequisites: [], postrequisites: ["CSE 2221"], corequisites: [] },
  "CSE 2221": { prerequisites: ["CSE 1223"], postrequisites: ["CSE 2231", "CSE 2321"], corequisites: ["MATH 1151"] },
  "CSE 2231": { prerequisites: ["CSE 2221"], postrequisites: ["CSE 2321", "CSE 2331", "CSE 2421", "CSE 3341", "CSE 390X"], corequisites: ["CSE 2321"] },
  "CSE 2321": { prerequisites: ["CSE 2221", "MATH 1151"], postrequisites: ["CSE 2331", "CSE 3341", "CSE 2421", "CSE 390X"], corequisites: ["CSE 2231"] },
  "CSE 2331": { prerequisites: ["CSE 2231", "CSE 2321", "STAT 3470"], postrequisites: ["CSE 3341", "CSE 390X", "CSE 32X1"], corequisites: ["MATH 3345"] },
  "CSE 2421": { prerequisites: ["CSE 2231", "CSE 2321"], postrequisites: ["CSE 2431", "CSE 3341", "CSE 390X"], corequisites: [] },
  "CSE 2431": { prerequisites: ["CSE 2421"], postrequisites: ["CSE 390X", "CSE 35X1"], corequisites: [] },
  "CSE 2501": { prerequisites: ["CSE 2231", "ENGLISH 1110"], postrequisites: [], corequisites: [] },
  "CSE 32X1": { prerequisites: ["CSE 2331"], postrequisites: ["CSE 34X1"], corequisites: [] },
  "CSE 34X1": { prerequisites: ["CSE 32X1"], postrequisites: ["CSE 35X1"], corequisites: [] },
  "CSE 35X1": { prerequisites: ["CSE 34X1", "CSE 2431"], postrequisites: [], corequisites: [] },
  "CSE 3341": { prerequisites: ["CSE 2231", "CSE 2421, CSE 390X"], postrequisites: [], corequisites: [] },
  "CSE 390X": { prerequisites: ["CSE 2231", "CSE 2321", "CSE 2421"], postrequisites: ["CSE 591X", "CSE 3341"], corequisites: [] },
  "CSE 591X": { prerequisites: ["CSE 390X"], postrequisites: [], corequisites: [] },
  "ECE 2020": { prerequisites: ["MATH 1172", "PHYSICS 1250"], postrequisites: [], corequisites: [] },
  "ECE 2060": { prerequisites: ["MATH 1151"], postrequisites: [], corequisites: [] },
  "STAT 3470": { prerequisites: ["MATH 1172"], postrequisites: ["CSE 2331"], corequisites: [] },
  "MATH/SCIENCE ELECTIVE": { prerequisites: [], postrequisites: [], corequisites: [] },
  "TECHNICAL ELECTIVE": { prerequisites: [], postrequisites: [], corequisites: [] },
};

document.addEventListener('mouseover', function(event) {
  const hovered = event.target;

  if (hovered.id && courses[hovered.id]) {
    const courseId = hovered.id;
    const immediatePre = courses[courseId].prerequisites;
    const immediatePost = courses[courseId].postrequisites;
    const coReq = courses[courseId].corequisites;
    const preSequence = getPreSequence(courseId);
    const postSequence = getPostSequence(courseId);
    hovered.style.backgroundColor = 'yellow';

    for (pre of immediatePre) {
      const el = document.getElementById(pre);
      el.style.backgroundColor = 'green';
    }

    for (pre of preSequence) {
      const el = document.getElementById(pre);
      el.style.backgroundColor = 'lightgreen'
    }
    
    for (co of coReq) {
      const el = document.getElementById(co);
      el.style.backgroundColor = 'purple';
    }

    for (post of immediatePost) {
      const el = document.getElementById(post);
      el.style.backgroundColor = 'blue'
    }

    for (post of postSequence) {
      const el = document.getElementById(post);
      el.style.backgroundColor = 'lightblue'
    }
  } 
  else {
      console.log('Hovering over an element without an ID.');
  }
});

document.addEventListener('mouseout', function(event) {
  document.querySelectorAll('.course').forEach(el => {
    el.style.backgroundColor = '';
  });
});

function getPreSequence (courseId) {
  let ret = [];
  for (pre of courses[courseId].prerequisites) {
    ret.push(pre);
    ret = ret.concat(getPreSequence(pre));
  }
  return ret;
}

function getPostSequence (courseId) {
  let ret = [];
  for (post of courses[courseId].postrequisites) {
    ret.push(post);
    ret = ret.concat(getPostSequence(post));
  }
  return ret;
}

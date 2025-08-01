---
layout: default

header:
  title: Paxton Fitzpatrick
  icons:
    - title: Email
      icon: fa-envelope
      type: fa
      site_data: email
    - title: GitHub
      icon: fa-github
      type: fab
      site_data: github
    - title: LinkedIn
      icon: fa-linkedin-in
      type: fab
      site_data: linkedin
    - title: X (Twitter)
      icon: fa-x-twitter
      type: fab
      site_data: twitter_url
    - title: Google Scholar
      icon: fa-google-scholar
      type: fab
      site_data: google_scholar
    - title: CV
      icon: fa-file-alt
      type: fa
      site_data: cv_url

sections:
  - type: multipane.html
    section_id: about
    background_style: bg-secondary
    title: About me
    before_text: >
     I build computational models of human learning and memory, and create software tools for research and education.
     <br/><br/>I'm currently a Ph.D. candidate in Cognitive Neuroscience at
     [Dartmouth College](https://home.dartmouth.edu){:target="_blank"}.
    panes:
      - type: bio-timeline.html
        title: Bio
        bio_paragraphs:
          - text: I grew up in a small town in central Pennsylvania before starting college at
              [Dartmouth](https://home.dartmouth.edu){:target="_blank"} in 2015.
            image: assets/img/bio/pa-map.png
            timeline_group: undergrad
          - text: From 2016 to 2019, I worked in the
              [Dartmouth Brain Imaging Center](https://www.dartmouth.edu/dbic){:target="_blank"}, collecting and
              processing fMRI data for a multi-year neuroimaging study.
            image: assets/img/bio/brain-scan.jpg
            timeline_group: dbic
          - text: In 2017, I worked with [Bregman Media Labs](http://bregman.dartmouth.edu){:target="_blank"} to create
              [*Exnectome*](https://vimeo.com/208333051){:target="_blank"}, the first EEG sonification-based musical
              ensemble.
            image: assets/img/bio/eeg-headset.jpeg
            timeline_group: bregman
          - text: I joined the [Contextual Dynamics Lab](https://www.context-lab.com){:target="_blank"} in 2017, working
              on developing novel methods and software for studying episodic memory. I managed the CDL from 2018 to
              2021, designing and executing studies, mentoring teams of undergrads, and maintaining the lab's software
              stack.
            image: assets/img/bio/cdl-logo.png
            timeline_group: cdl
          - text: In 2019, I graduated from [Dartmouth](https://home.dartmouth.edu){:target="_blank"} with a BA
              in cognitive neuroscience. I wrote my honors thesis on a computational framework for modeling how memories
              deform over time and predicting neural activity from verbal recalls. My thesis won the <i>Nickerson</i>
              and <i>Leaton</i> awards for undergraduate neuroscience research.
            image: assets/img/bio/dartmouth-logo.png
            timeline_group: undergrad
          - text: Since 2019, I've TA'd and guest-taught undergrad and grad-level courses on neuroscience, statistics,
              programming, data science, and research methods. I won awards for teaching from Dartmouth in 2019 and 2024.
            image: assets/img/bio/filene-lecture.jpg
            timeline_group: teaching
          - text: I started my Ph.D. at [Dartmouth](https://graduate.dartmouth.edu/){:target="_blank"} in 2021. In 2024,
              my master's thesis on modeling conceptual knowledge and learning using text embedding models won a
              <i>Neukom</i> prize for graduate research in computational science.
            image: assets/img/bio/guarini-logo.png
            timeline_group: phd-student
          - text: I'm now a Ph.D. candidate in cognitive neuroscience, working with
              [Dr. Jeremy Manning](https://pbs.dartmouth.edu/people/jeremy-rothman-manning){:target="_blank"}. My
              current work is focused on building automated, scalable systems for personalizing and improving how people
              learn.
            image: assets/img/bio/moore-pic.jpeg
            timeline_group: phd-candidate
        timeline:
          start: 2015
          end: 2026
          events:
            - title: Undergraduate, Dartmouth College
              start: 2015.75
              end: 2019.5
              group: undergrad
            - title: Research Assistant, Dartmouth Brain Imaging Center
              start: 2016.75
              end: 2019.5
              group: dbic
            - title: Research Assistant, Contextual Dynamics Lab
              start: 2017.25
              end: 2018.5
              group: cdl
            - title: Research Assistant, Bregman Media Labs
              start: 2017.25
              end: 2018
              group: bregman
            - title: Laboratory & Research Manager, Contextual Dynamics Lab
              start: 2018.5
              end: 2021.75
              group: cdl
            - title: Peer Tutor, Intro Computer Science
              start: 2018.75
              end: 2019.5
              group: teaching
            - title: Teaching Assistant, Human Memory
              start: 2019.75
              end: 2020
              group: teaching
            - title: Teaching Assistant & Guest Lecturer, Intro to Programming
               for Psychological Scientists
              start: 2020
              end: 2020.25
              group: teaching
            - title: Teaching Assistant, Storytelling with Data
              start: 2020.25
              end: 2020.5
              group: teaching
            - title: Teaching Assistant, Intro to Programming for Psychological Scientists
              start: 2021
              end: 2021.25
              group: teaching
            - title: Ph.D. Student, Dartmouth College
              start: 2021.75
              end: 2024.5
              group: phd-student
            - title: Teaching Assistant, Laboratory in Experimental Psychology
              start: 2022.25
              end: 2022.5
              group: teaching
            - title: Teaching Assistant, Experimental Design, Methodology, and Data Analysis Procedures
              start: 2023
              end: 2023.25
              group: teaching
            - title: Teaching Assistant, Methods in Neuroscience at Dartmouth (MIND) Summer School
              start: 2023.5
              end: 2023.75
              group: teaching
            - title: Teaching Assistant, Laboratory in Psychological Science
              start: 2023.5
              end: 2023.75
              group: teaching
            - title: Ph.D. Candidate, Dartmouth College
              start: 2024.5
              end: present
              group: phd-candidate
            - title: Teaching Assistant, Laboratory in Psychological Science
              start: 2024.75
              end: 2025
              group: teaching

      - type: skills.html
        title: Skills
        categories:
          - title: Programming & web development
            skills:
              - image: python.png
                caption: Python
              - image: r.png
                caption: R
              - image: javascript.png
                caption: JavaScript
              - image: shell.png
                caption: Unix shell
              - image: latex.png
                caption: LaTeX
              - image: supercollider.png
                caption: SuperCollider
              - image: html.png
                caption: HTML
              - image: css.png
                caption: CSS
              - image: sass.png
                caption: Sass
              - image: liquid.png
                caption: Liquid
              - image: jekyll.png
                caption: Jekyll
          - title: Development tools
            skills:
              - image: git.png
                caption: Git
              - image: docker.png
                caption: Docker
              - image: sqlite.png
                caption: SQLite
              - image: slurm.png
                caption: SLURM
              - image: moab-torque.png
                caption: Moab-TORQUE
              - image: conda.png
                caption: Conda
              - image: github-actions.png
                caption: GitHub Actions
              - image: travis.png
                caption: Travis CI
              - image: pytest.png
                caption: pytest
              - image: selenium.png
                caption: Selenium
              - image: jupyter.png
                caption: Jupyter ecosystem
              - image: packaging.png
                caption: Python packaging
          - title: Experimental design & data collection
            skills:
              - image: jspsych.png
                caption: jsPsych
              - image: psiturk.png
                caption: psiTurk
              - image: mturk.png
                caption: Amazon MTurk
              - image: psychopy.png
                caption: PsychoPy
              - image: superlab.png
                caption: SuperLab
              - image: openbci.png
                caption: OpenBCI
              - image: opensesame.png
                caption: OpenSesame
              - image: morphx.png
                caption: MorphX
              - image: qualtrics.png
                caption: Qualtrics
          - title: Data analysis & visualization
            skills:
              - image: numpy.png
                caption: NumPy
              - image: pandas.png
                caption: Pandas
              - image: scipy.png
                caption: SciPy
              - image: nltk.png
                caption: NLTK
              - image: lme4.png
                caption: lme4
              - image: statsmodels.png
                caption: statsmodels
              - image: sklearn.png
                caption: scikit-learn
              - image: nilearn.png
                caption: Nilearn
              - image: igraph.png
                caption: igraph
              - image: graphia.png
                caption: Graphia
              - image: matplotlib.png
                caption: Matplotlib
              - image: seaborn.png
                caption: Seaborn
              - image: plotly.png
                caption: Plotly
              - image: hypertools.png
                caption: Hypertools
              - image: freesurfer.png
                caption: FreeSurfer
              - image: boris.png
                caption: BORIS
              - image: anvil.png
                caption: ANVIL
          - title: Non-technical
            skills:
              - image: illustrator.png
                caption: Adobe Illustrator
              - image: photoshop.png
                caption: Adobe Photoshop
              - image: keynote.png
                caption: Keynote
              - image: french.png
                caption: French
              - image: writing.png
                caption: Scientific writing
              - image: speaking.png
                caption: Public speaking

  - type: multipane-filter.html
    all_first: false
    section_id: research
    background_style: bg-primary
    title: Research
    pane_type: publication-cards.html
    before_text: >
      My research uses language models to capture how our memories preserve, distort, and compress the external world,
      and to identify the neural mechanisms that drive these transformations.
    #   <br/><br/>I'm particularly interested in
    #   how episodic memory compresses the temporal structure of an experience, and how that compression is warped over
    #   time.
    # I use language models to transform real-world experiences into high-dimensional geometries, and study how these
    # structures are preserved, distorted, and compressed in our memories.
    panes:
      - title: Manuscripts
        filter: manuscript
      - title: Talks
        filter: talk
      - title: Posters
        filter: poster
    items:
      - type: manuscript
        title: Text embedding models yield high-resolution insights into conceptual knowledge from short mulitple-choice quizzes
        text: '**Fitzpatrick P. C.**, Heusser A. C., Manning J. R. (2025). Text embedding models yield high-resolution
         insights into conceptual knowledge from short mulitple-choice quizzes. *PsyArXiv*: 10.31234/osf.io/dh3q2.'
        image: assets/img/research/khan-white.png
        pdf_url: https://osf.io/preprints/psyarxiv/dh3q2_v2
        code_url: https://github.com/ContextLab/efficient-learning-khan
        data_url: https://github.com/ContextLab/efficient-learning-khan/tree/master/data
      - type: talk
        title: 'Davos: a novel approach to sharing reproducible research code with collaborators, students, and the public'
        text: '**Fitzpatrick P. C.** (2024). Davos: a novel approach to sharing reproducible research code with collaborators, students, and the public. *Dartmouth College*. Hanover, NH.'
        image: assets/img/research/cbb-2024f.png
      - type: manuscript
        title: Feature and order manipulations in a free recall task affect memory for current and future lists
        text: 'Manning J. R., Whitaker E. C., **Fitzpatrick P. C.**, Lee M. R., Frantz A. M., Bollinger B. J., Romanova
         D., Field C. E., Heusser A. C. (2024). Feature and order manipulations in a free recall task affect memory for
         current and future lists. *PsyArXiv*: 10.31234/osf.io/erzfp.'
        image: assets/img/research/frfr-white.png
        pdf_url: https://osf.io/preprints/psyarxiv/erzfp
        code_url: https://github.com/ContextLab/FRFR-analyses
        data_url: https://github.com/ContextLab/FRFR-analyses/tree/master/data
      - type: manuscript
        title: 'Davos: a Python package "smuggler" for constructing lightweight reproducible notebooks'
        text: '**Fitzpatrick P. C.**, Manning J. R. (2024). Davos: a Python package "smuggler" for constructing
         lightweight reproducible notebooks. *SoftwareX*, *25*, 101614.'
        image: assets/img/research/davos-white.png
        pdf_url: https://www.dropbox.com/scl/fi/tj0mhxdt2r62x986i3a7r/FitzMann24.pdf?rlkey=4rhec7cly9bowjmk5k0zvhp01&e=1
        code_url: https://github.com/ContextLab/davos
      - type: talk
        title: A framework for modeling idiosyncratic distortions and compressions of semantic content representations
        text: '**Fitzpatrick P. C.** (2023). A framework for modeling idiosyncratic distortions and compressions of
          semantic content representations. *Dartmouth College*. Hanover, NH.'
        image: assets/img/research/cbb-2024x.png
      - type: talk
        title: How do context and time modulate the geometric trajectory of memory?
        text: '**Fitzpatrick P. C.** (2023). How do context and time modulate the geometric trajectory of memory?
         *Context and Episodic Memory Symposium*. Lake Buena Vista, FL.'
        image: assets/img/research/cems-2023.png
      - type: talk
        title: Modeling real-world learning & memory
        text: '**Fitzpatrick P. C.** (2023). Modeling real-world learning & memory. *Dartmouth College*. Hanover, NH.'
        image: assets/img/research/specialist-talk.png
      - type: manuscript
        title: Fitness tracking reveals task-specific associations between memory, mental health, and exercise
        text: Manning J. R., Notaro G. M., Chen E., **Fitzpatrick P. C.** (2022). Fitness tracking reveals task-specific
         associations between memory, mental health, and exercise. *Scientific Reports*, *12*(1), 13822.
        image: assets/img/research/fitwit-white.png
        pdf_url: https://rdcu.be/ethog
        code_url: https://github.com/ContextLab/brainfit-paper
        data_url: https://github.com/ContextLab/brainfit-paper/tree/main/data
      - type: poster
        title: A geometric approach to modeling knowledge and learning from Khan Academy course videos
        text: '**Fitzpatrick P. C.**, Heusser A. C., Manning J. R. (2022). A geometric approach to modeling knowledge and learning
         from Khan Academy course videos. *Context and Episodic Memory Symposium*. Philadelphia, PA.'
        image: assets/img/research/cems-2022.png
        pdf_url: https://www.dropbox.com/s/6h621wefszdxv46/CEMS_2022.pdf?dl=0
      - type: talk
        title: Connecting fragmented networks of neuroscientific research via bibliometric analysis
        text: '**Fitzpatrick P. C.**, O&#39;Nell K. C. (2022). Connecting fragmented networks of neuroscientific
         research via bibliometric analysis. *Dartmouth College*. Hanover, NH.'
        image: assets/img/research/citation-networks-talk.png
      - type: talk
        title: Automated personalized instruction for improving online learning
        text: '**Fitzpatrick P. C.** (2022). Automated personalized instruction for improving online learning.
         *PBS Annual Retreat*. Fairlee, VT.'
        image: assets/img/research/pbs-retreat-talk.png
      - type: talk
        title: 'Thought trajectories: a geometric framework for studying complex cognitive processes'
        text: '**Fitzpatrick P. C.** (2022). Thought trajectories: a geometric framework for studying complex cognitive
         processes. *Dartmouth Text-analysis Workshop*. Hanover, NH.'
        image: assets/img/research/text-analysis-workshop-talk.png
      - type: poster
        title: Cognitive tasks as a diagnostic tool for mental health
        text: Jain S., Schreder N., **Fitzpatrick P. C.**, Ziman K., Manning J. R. (2021). Cognitive tasks as a diagnostic
         tool for mental health. *Trends in Psychology Summit*. Cambridge, MA.
        image: assets/img/research/tips-2021.png
        pdf_url: https://www.dropbox.com/s/e87wwac4o5rpzn1/TIPS_2021.pdf?dl=0
      - type: talk
        title: Capturing the geometric and neural structures of experiences and memories
        text: '**Fitzpatrick P. C.** (2022). Capturing the geometric and neural structures of experiences and memories.
         *Dartmouth College*. Hanover, NH.'
        image: assets/img/research/thesis-talk.png
      - type: manuscript
        title: Geometric models reveal behavioral and neural signatures of transforming experiences into memories
        text: Heusser A. C.&dagger;, **Fitzpatrick P. C.**&dagger;, Manning J. R. (2021). Geometric models reveal
         behavioural and neural signatures of transforming experiences into memories. *Nature Human Behaviour*,
         *5*(7), 905&ndash;919.

         <p class="footnote"><em>&dagger;denotes equal contribution</em></p>
        image: assets/img/research/sherlock-white.png
        pdf_url: https://rdcu.be/cfeFb
        code_url: https://github.com/ContextLab/sherlock-topic-model-paper
        data_url: https://arks.princeton.edu/ark:/88435/dsp01nz8062179
      - type: talk
        title: Docker for scientific research
        text: '**Fitzpatrick P. C.** (2021). Docker for scientific research. *Dartmouth College*. Hanover, NH.'
        image: assets/img/research/docker-talk.png
        slides_url: https://github.com/paxtonfitzpatrick/docker-tutorial/blob/master/slides/docker-tutorial.pdf
        code_url: https://github.com/paxtonfitzpatrick/docker-tutorial
      - type: talk
        title: Web-based behavioral experiments for online data collection
        text: '**Fitzpatrick P. C.** (2020). Web-based behavioral experiments for online data collection. *EPSCoR
         Attention Consortium meeting*. Virtual.'
        image: assets/img/research/epscor-talk.png
        slides_url: https://github.com/paxtonfitzpatrick/psiturk-experiment-template/blob/master/slides/slides.pdf
        code_url: https://github.com/paxtonfitzpatrick/psiturk-experiment-template
      - type: poster
        title: Exploring the evolving geometric structure of experiences and memories
        text: '**Fitzpatrick P. C.**, Heusser A. C., Manning J. R. (2019). Exploring the evolving geometric structure
         of experiences and memories. *Society for Neuroscience Annual Meeting*. Chicago, IL.'
        image: assets/img/research/sfn-2019.png
        pdf_url: https://www.dropbox.com/s/7y6q9gsi2ywkdbm/SFN_2019b.pdf?dl=0
      - type: poster
        title: Mapping between naturalistic experience and verbal recall
        text: '**Fitzpatrick P. C.**, Heusser A. C., Manning J. R. (2018). Mapping between naturalistic experience and
         verbal recall. *Society for Neuroscience Annual Meeting*. San Diego, CA.'
        image: assets/img/research/sfn-2018.png
        pdf_url: https://www.dropbox.com/s/rv86ve80zjis91t/SFN_2018a.pdf?dl=0
        data_url: https://arks.princeton.edu/ark:/88435/dsp01nz8062179
      - type: poster
        title: Capturing the geometric structure of our experiences and how we remember them
        text: Heusser A. C., **Fitzpatrick P. C.**, Manning J. R. (2018). Capturing the geometric structure of our
         experiences and how we remember them. *Conference on Cognitive Computational Neuroscience*. Philadelphia, PA.
        image: assets/img/research/ccn-2018.png
        pdf_url: https://www.dropbox.com/s/zmcc74w6z6pow0t/CCN_2018.pdf?dl=0
        data_url: https://arks.princeton.edu/ark:/88435/dsp01nz8062179
      - type: poster
        title: The utility of speech-to-text software for transcription of verbal response data
        text: '**Fitzpatrick P. C.**, Ziman K., Heusser A. C., Field C. E., Manning J. R. (2018). The utility of
         speech-to-text software for transcription of verbal response data. *Wetterhahn Science Symposium*. Hanover, NH.'
        image: assets/img/research/wetterhahn-2018a.png
        pdf_url: https://www.dropbox.com/s/kd72y0qh0bsm3mr/Wetterhahn_2018c.pdf?dl=0
      - type: poster
        title: 'Adaptive free recall: Enhancing (or diminishing) memory'
        text: 'Lee M., Chacko R., Whitaker E., **Fitzpatrick P. C.**, Field C. E., Ziman K., Bollinger B., Heusser A. C., Manning J. R. (2018). Adaptive free recall: Enhancing (or diminishing) memory. *Wetterhahn Science
         Symposium*. Hanover, NH.'
        image: assets/img/research/wetterhahn-2018b.png
        pdf_url: https://www.dropbox.com/s/qmrzr0bc00p7hqv/Wetterhahn_2018a.pdf?dl=0
      - type: manuscript
        title: Is automatic speech-to-text transcription ready for use in psychological experiments?
        text: Ziman K., Heusser A. C., **Fitzpatrick P. C.**, Field C. E., Manning J. R. (2018). Is automatic
         speech-to-text transcription ready for use in psychological experiments?. *Behavior Research Methods*, 1&ndash;9.
        image: assets/img/research/autofr-paper-white.png
        pdf_url: https://link.springer.com/content/pdf/10.3758/s13428-018-1037-4.pdf
        code_url: https://github.com/ContextLab/AutoFR-analyses
        data_url: https://github.com/ContextLab/quail/tree/master/quail/data
      - type: manuscript
        title: 'Quail: a Python toolbox for analyzing and plotting free recall data'
        text: 'Heusser A. C., **Fitzpatrick P. C.**, Field C. E., Ziman K., Manning J. R. (2017). Quail: a Python
         toolbox for analyzing and plotting free recall data. *The Journal of Open Source Software*, *2*(18): 424.'
        image: assets/img/research/quail-white.png
        pdf_url: https://www.theoj.org/joss-papers/joss.00424/10.21105.joss.00424.pdf
        code_url: https://github.com/ContextLab/quail

  - type: multipane.html
    section_id: software
    background_style: bg-secondary
    title: Software
    before_text: I also regularly develop, maintain, and contribute to a number of open-source software projects.
    after_text: ...and of course
     [this website](https://github.com/paxtonfitzpatrick/paxtonfitzpatrick.github.io){:target="_blank"}!
    panes:
      - type: software.html
        title: Things I've created
        items:
          - title: davos
            description: Import Python packages even if they aren't installed. Enables the "`smuggle`" statement&#58;
             a drop-in replacement for [`import`](https://docs.python.org/3/reference/import.html){:target="_blank"}
             that handles missing packages on the fly. Add "*onion comments*" alongside `smuggle` statements to specify
             package versions and additional options. Can be used to turn
             [Jupyter](https://jupyter.org){:target="_blank"} or
             [Colab](https://colab.research.google.com){:target="_blank"} notebooks into self-contained, reproducible
             Python environments that manage dependencies at runtime.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/davos
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://github.com/ContextLab/davos#readme
          - title: docker-tutorial
            description: Walkthroughs and template code for running experiments and analyzing data from within
             [Docker](https://www.docker.com){:target="_blank"} containers. Pre-built images are available on
             [Docker Hub](https://hub.docker.com){:target="_blank"}.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/paxtonfitzpatrick/docker-tutorial
              - icon: fa-docker
                type: fab
                text: View on Docker Hub
                url: https://hub.docker.com/repository/docker/paxtonfitzpatrick/tutorial-image
              - icon: fa-chalkboard
                type: fas
                text: Tutorial slides
                url: https://github.com/paxtonfitzpatrick/docker-tutorial/blob/main/slides/docker-tutorial.pdf
          - title: particle-image
            description: Animate a particlized image in vanilla JavaScript. Turn an image from the web into an animated
             swarm of interactive particles. Set parameters to control particle color, size, density, speed,
             hover/click/touch interactions, and more.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/paxtonfitzpatrick/particle-image
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://github.com/paxtonfitzpatrick/particle-image#readme
              - icon: fa-codepen
                type: fab
                text: CodePen demo
                url: https://codepen.io/paxtonfitzpatrick/pen/GRoMQgb
          - title: psiturk-experiment-template
            description: A template behavioral experiment ready to be deployed locally or online via
             [Amazon Mechanical Turk](https://www.mturk.com){:target="_blank"}. Implemented using the
             [psiTurk](https://psiturk.org){:target="_blank"} platform and
             [jsPsych](https://www.jspsych.org){:target="_blank"} library, and isolated within four networked
             [Docker](https://www.docker.com){:target="_blank"} containers&#58; a
             [Debian 9](https://www.debian.org/releases/stretch){:target="_blank"} container to house the experiment
             code and psiTurk server, an [nginx](https://www.nginx.com){:target="_blank"} server for load balancing, a
             [MySQL](https://www.mysql.com){:target="_blank"} database for storing data, and
             [Adminer](https://www.adminer.org){:target="_blank"} for inspecting and downloading data.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/paxtonfitzpatrick/psiturk-experiment-template
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://github.com/paxtonfitzpatrick/psiturk-experiment-template#readme
              - icon: fa-chalkboard
                type: fas
                text: Tutorial slides
                url: https://github.com/paxtonfitzpatrick/psiturk-experiment-template/blob/master/slides/slides.pdf
          - title: CDL-docker-stacks
            description: A collection of optimized, extensible, hierarchically built Docker images for common
             neuro/data science tasks. Pre-built images are available on
             [Docker Hub](https://hub.docker.com){:target="_blank"} in Python 3.6, 3.7, and 3.8
             variants.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/CDL-docker-stacks
              - icon: fa-docker
                type: fab
                text: View on Docker Hub
                url: https://hub.docker.com/u/contextlab
          - title: cluster-tools-dartmouth
            description: A Python toolbox for remotely interacting with Dartmouth's
             [Discovery](https://rc.dartmouth.edu/index.php/discovery-overview){:target="_blank"} HPC cluster.
             Automatically generates PBS scripts, submits jobs to the scheduler, monitors progress, and compiles results
             when finished. Can easily be configured to work with any Moab/TORQUE system.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/paxtonfitzpatrick/cluster-tools-dartmouth
          - title: gittracker
            description: A CLI app for tracking the states of all your local Git repositories in one place. Run a single
             command from any directory to display `git status`-like information for each repo `gittracker` is
             configured to track. Supports arbitrarily nested submodules, multiple verbosity levels, and automatic
             discovery of local repos.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/paxtonfitzpatrick/gittracker
              - icon: fa-video
                type: fas
                text: Demo video
                url: https://user-images.githubusercontent.com/26118297/124789467-50a2fc80-df18-11eb-9454-01c0341bf50e.gif
          - title: quail
            description: A Python toolbox for processing, analyzing, and visualizing free recall data. Provides a common
             interface for working with data from both list-learning and naturalistic memory experiments.
             Integrates with the
             [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text){:target="_blank"} API for
             rapid, on-the-fly audio transcription.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/contextlab/quail
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://cdl-quail.readthedocs.io/en/latest/index.html
              - icon: fa-file-pdf
                type: fas
                text: JOSS paper
                url: https://www.theoj.org/joss-papers/joss.00424/10.21105.joss.00424.pdf
          - title: autoFR
            description: A verbal free recall experiment that incorporates automated speech decoding. Uses
             [quail](https://github.com/contextlab/quail){:target="_blank"} to automatically obtain recall transcripts,
             onset/offset times, IRTs, confidence scores, and other metadata. Provides a custom
             [jsPsych](https://www.jspsych.org){:target="_blank"} plugin for collecting and saving verbal recall data.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/AutoFR
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://github.com/ContextLab/AutoFR#readme
              - icon: fa-file-pdf
                type: fas
                text: BRM paper
                url: https://link.springer.com/article/10.3758/s13428-018-1037-4
      - type: software.html
        title: Other things I work on
        items:
          - title: hypertools
            role: lead maintainer
            description: A Python package for visualizing and manipulating high-dimensional data. Transform, align,
             normalize, interpolate, cluster, reduce, and plot numeric or text data with a single function call or in
             individual steps. Save full analysis pipelines including data and trained models as `DataGeometry`
             objects for later reuse. Designed to be fully customizable with reasonable defaults.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/hypertools
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://hypertools.readthedocs.io/en/latest/
              - icon: fa-file-pdf
                type: fas
                text: JMLR paper
                url: https://jmlr.org/papers/volume18/17-434/17-434.pdf
          - title: umap-learn
            role: core maintainer
            description: Python implementation of
             [Uniform Manifold Approximation and Projection](https://arxiv.org/abs/1802.03426){:target="_blank"}.
             A general-purpose non-linear dimensionality reduction algorithm based on finding a low-dimensional
             projection of the data that best preserves its fuzzy topological structure. The Python package also
             implements supervised, semi-supervised, aligned, and parametric UMAP variants, an inverse transform,
             [densMAP](https://www.biorxiv.org/content/10.1101/2020.05.12.077776v1){:target="_blank"}, and a
             plotting library.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/lmcinnes/umap
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://umap-learn.readthedocs.io/en/latest/
              - icon: fa-file-pdf
                type: fas
                text: arXiv preprint
                url: https://arxiv.org/pdf/1802.03426.pdf
          - title: timecorr
            role: core contributor
            description: A Python toolbox for exploring higher-order structure in multivariate timeseries data.
             Iteratively computes dynamic correlations and reduces dimensionality to approximate higher-order dynamic
             correlations in a computationally tractable way. Also supports computing various dynamic graph theoretic
             measures.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/timecorr
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://timecorr.readthedocs.io/en/latest
              - icon: fa-file-pdf
                type: fas
                text: Nature Comms paper
                url: https://www.nature.com/articles/s41467-021-25876-x
          - title: SuperEEG
            role: core contributor
            description: Infer activity throughout the brain from a small(ish)
             number of electrodes using Gaussian process regression
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/supereeg
              - icon: fa-book
                type: fas
                text: Documentation
                url: https://supereeg.readthedocs.io/en/latest
              - icon: fa-file-pdf
                type: fas
                text: Cerebral Cortex paper
                url: https://academic.oup.com/cercor/article/30/10/5333/5851264
          - title: CDL-bibliography
            role: core contributor
            description: A shared `bibtex` file containing references for ~6,000 psychology, neuroscience, math,
             and machine learning papers.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/contextlab/cdl-bibliography
          - title: lab-manual
            role: core maintainer
            description: Lab manual and associated source code for the
             [Contextual Dynamics Lab](https://www.context-lab.com){:target="_blank"} at
             [Dartmouth College](https://home.dartmouth.edu){:target="_blank"}.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/contextlab/lab-manual
              - icon: fa-file-pdf
                type: fas
                text: PDF
                url: https://github.com/ContextLab/lab-manual/blob/master/lab_manual.pdf

  - type: contact.html
    section_id: contact
    background_style: bg-primary
    title: Get in touch
    map_embed: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d721.038682728594!2d-72.28847647071619!3d43.70733339869497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb4c9c361e1ddb1%3A0x8b2bba0d5b098fa6!2sMoore%20Psychology%20Bldg%2C%20Hanover%2C%20NH%2003755!5e0!3m2!1sen!2sus!4v1591571050608!5m2!1sen!2sus

footer:
  credits:
    - Built with [Jekyll](https://jekyllrb.com/){:target="_blank"} and
      [GitHub Pages](https://pages.github.com/){:target="_blank"}.
    - Site source code available on GitHub,
      [here](https://github.com/paxtonfitzpatrick/paxtonfitzpatrick.github.io){:target="_blank"}
    - Manuscript graphics by [Talia Manning](https://www.chamstudios.com/about){:target="_blank"}
---

---
layout: home
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
    - title: Twitter
      icon: fa-twitter
      type: fab
      site_data: twitter
    - title: CV
      icon: fa-file-alt
      type: fa
      site_data: cv_path
    - title: CDL
      icon: cdl-logo
      type: custom
      site_data: lab_website


sections:
  - type: multipane.html
    section_id: about
    background_style: bg-secondary
    title: About me
    before_text: I build computational models of learning and memory, and create software tools for neural and
     behavioral data analysis.
    panes:
      - type: bio-timeline.html
        title: Bio
        before_text: I graduated from [Dartmouth College](https://home.dartmouth.edu/){:target="_blank"} in 2019.
         Currently, I'm a Lab Manager and Research Assistant in the
         [Contextual Dynamics Lab](https://context-lab.com/){:target="_blank"}.
        bio_paragraphs:
          - text: I've always been fascinated by how and why people think the way they do. Growing up, I lived in
             seven different places before settling in Camp Hill, Pennsylvania. Through constantly meeting new people, 
             I became enamored with how each individual's unique set of life experiences lead to such different
             personalities and beliefs.
            image: assets/img/bio/map-pins.png
          - text: These interests led me to pursue a degree in Neuroscience at Dartmouth College, and quickly fall in
             love with research. I began working for the
             [Dartmouth Brain Imaging Center](https://www.dartmouth.edu/dbic/){:target="_blank"}, collecting and
             processing fMRI data, as well as
             [Bregman Media Labs](http://bregman.dartmouth.edu/){:target="_blank"}, where I worked with
             [Dr. Michael Casey](https://faculty-directory.dartmouth.edu/michael-casey){:target="_blank"} to create the
             first EEG sonification-based musical ensemble.
            image: assets/img/bio/eeg-headset.jpeg
          - text: I then joined the [Contextual Dynamics Lab](https://www.context-lab.com/){:target="_blank"} 
             (PI&#58; [Dr. Jeremy Manning](https://pbs.dartmouth.edu/people/jeremy-rothman-manning){:target="_blank"})
             and discovered passions for computational memory research and software development. I developed a love
             for mentoring others, and after my junior year of college I began managing the CDL and serving as a
             tutor and TA for various neuroscience and computer science classes.  I wrote my honors thesis on a
             computational framework for modeling how episodic memories deform over time and inferring neural
             representations of their semantic content.
            image: assets/img/bio/cdl-logo.png
          - text: Since graduating in 2019, I've continued managing the CDL, working on memory
             research, writing software, and mentoring students. My current research uses natural language processing
             and other machine learning techniques to study how we understand the world around us and create
             technologies to help us better learn from it. 
            image: assets/img/bio/brain-scan.jpg
        timeline:
          start: 2015
          end: 2021
          events:
            - title: Undergraduate, Dartmouth College
              start: 2015.75
              end: 2019.5
              color: 00693e
            - title: Research Assistant, Dartmouth Brain Imaging Center
              start: 2016.75
              end: 2019.5
              color: 56C2F3
            - title: Research Assistant, Contextual Dynamics Lab
              start: 2017.25
              end: 2018.5
              color: 24ed67
            - title: Research Assistant, Bregman Media Labs
              start: 2017.25
              end: 2018
              color: d807e3
            - title: Lab Manager, Contextual Dynamics Lab
              start: 2018.5
              end: 2021
              color: 17ad46
            - title: Private Tutor, Intro Computer Science
              start: 2018.75
              end: 2019.5
              color: d9af1a
            - title: Teaching Assistant, Human Memory
              start: 2019.75
              end: 2020
              color: 100f70
            - title: Teaching Assistant, Storytelling with Data
              start: 2020.25
              end: 2020.5
              color: fa0011
              
      - type: skills.html
        title: Skills
        categories:
          - title: Programming & web development
            skills:
              - image: assets/img/skills/python.png
                caption: Python
              - image: assets/img/skills/javascript.png
                caption: JavaScript
              - image: assets/img/skills/html.png
                caption: HTML
              - image: assets/img/skills/css.png
                caption: CSS
              - image: assets/img/skills/shell.png
                caption: Shell
              - image: assets/img/skills/latex.png
                caption: TeX/LaTeX
              - image: assets/img/skills/supercollider.png
                caption: SuperCollider
              - image: assets/img/skills/bootstrap.png
                caption: Bootstrap
              - image: assets/img/skills/jekyll.png
                caption: Jekyll
          - title: Development tools
            skills:
              - image: assets/img/skills/git.png
                caption: Git/GitHub
              - image: assets/img/skills/docker.png
                caption: Docker
              - image: assets/img/skills/db.png
                caption: SQLite/MySQL/SQLAlchemy
              - image: assets/img/skills/hpc.png
                caption: High-performance computing (Moab/TORQUE)
              - image: assets/img/skills/conda.png
                caption: Conda
              - image: assets/img/skills/pytest.png
                caption: pytest
              - image: assets/img/skills/travis.png
                caption: Travis CI
              - image: assets/img/skills/github-actions.png
                caption: GitHub Actions
              - image: assets/img/skills/jupyter.png
                caption: Jupyter/IPython/ Colaboratory
              - image: assets/img/skills/packaging.png
                caption: Python packaging
          - title: Experimental design & data collection
            skills:
              - image: assets/img/skills/jspsych.png
                caption: jsPsych
              - image: assets/img/skills/psiturk.png
                caption: psiTurk
              - image: assets/img/skills/mturk.png
                caption: Amazon Mechanical Turk
              - image: assets/img/skills/psychopy.png
                caption: PsychoPy
              - image: assets/img/skills/superlab.png
                caption: Cedrus SuperLab
              - image: assets/img/skills/opensesame.png
                caption: OpenSesame
              - image: assets/img/skills/morphx.png
                caption: Norkross MorphX
          - title: Data analysis & visualization
            skills:
              - image: assets/img/skills/scipy.png
                caption: SciPy
              - image: assets/img/skills/numpy.png
                caption: NumPy
              - image: assets/img/skills/pandas.png
                caption: Pandas
              - image: assets/img/skills/nltk.png
                caption: NLTK
              - image: assets/img/skills/matplotlib.png
                caption: Matplotlib
              - image: assets/img/skills/seaborn.png
                caption: Seaborn
              - image: assets/img/skills/plotly.png
                caption: Plotly
              - image: assets/img/skills/hypertools.png
                caption: Hypertools
              - image: assets/img/skills/statsmodels.png
                caption: statsmodels
              - image: assets/img/skills/sklearn.png
                caption: Scikit-learn
              - image: assets/img/skills/nilearn.png
                caption: Nilearn
              - image: assets/img/skills/fsl.png
                caption: FSL
              - image: assets/img/skills/boris.png
                caption: BORIS
              - image: assets/img/skills/anvil.png
                caption: ANVIL
          - title: Non-technical
            skills:
              - image: assets/img/skills/illustrator.png
                caption: Adobe Illustrator
              - image: assets/img/skills/photoshop.png
                caption: Adobe Photoshop
              - image: assets/img/skills/french.png
                caption: French
              - image: assets/img/skills/writing.png
                caption: Scientific & expository writing
              - image: assets/img/skills/speaking.png
                caption: Public speaking
              - image: assets/img/skills/leadership.png
                caption: Organizational leadership
            
  - type: multipane-filter.html
    section_id: research
    background_style: bg-primary
    title: Research
    pane_type: publication-cards.html
    before_text: >+
     My research uses natural language processing and other machine learning techniques to study learning
     and memory. 
     
     I'm particularly interested in how episodic memories change over time, and how different features of an experience
     impact how well we remember it.
    all_after_text: '&dagger;denotes equal contribution'
    panes:
      - title: Manuscripts
        filter: manuscript
        after_text: '&dagger;denotes equal contribution'
      - title: Posters
        filter: poster
    items:
      - type: manuscript
        title: Geometric models reveal behavioral and neural signatures of transforming experiences into memories
        text: Heusser A. C.&dagger;, **Fitzpatrick P. C.**&dagger;, Manning J. R. (2021). Geometric models reveal
         behavioural and neural signatures of transforming experiences into memories. *Nature Human Behaviour*. 
         doi:10.1038/s41562-021-01051-6
        image: assets/img/research/sherlock-white.png
        pdf_url: https://rdcu.be/cfeFb
        code_url: https://github.com/ContextLab/sherlock-topic-model-paper
        data_url: https://arks.princeton.edu/ark:/88435/dsp01nz8062179
      - type: poster
        title: Exploring the evolving geometric structure of experiences and memories
        text: __Fitzpatrick P. C.__, Heusser A. C., Manning J. R. (2019). Exploring the evolving geometric structure
         of experiences and memories. *Society for Neuroscience Annual Meeting*. Chicago, IL.
        image: assets/img/research/sfn-2019.png
        pdf_url: https://www.dropbox.com/sh/bpyk9gwpk8wexfe/AAASc1BGgX5I08xK07yrmJ96a/SFN_2019b.pdf?dl=0
      - type: poster
        title: Mapping between naturalistic experience and verbal recall
        text: __Fitzpatrick P. C.__, Heusser A. C., Manning J. R. (2018). Mapping between naturalistic experience and
         verbal recall. *Society for Neuroscience Annual Meeting*. San Diego, CA.
        image: assets/img/research/sfn-2018.png
        pdf_url: https://www.dropbox.com/sh/bpyk9gwpk8wexfe/AABVGrxhxUar2cztUwSx7mBda?dl=0&preview=SFN_2018a.pdf
        data_url: https://arks.princeton.edu/ark:/88435/dsp01nz8062179
      - type: poster
        title: Capturing the geometric structure of our experiences and how we remember them
        text: Heusser A. C., __Fitzpatrick P. C.__, Manning J. R. (2018). Capturing the geometric structure of our
         experiences and how we remember them. *Conference on Cognitive Computational Neuroscience*. Philadelphia, PA.
        image: assets/img/research/ccn-2018.png
        pdf_url: https://www.dropbox.com/sh/bpyk9gwpk8wexfe/AABVGrxhxUar2cztUwSx7mBda?dl=0&preview=CCN_2018.pdf
        data_url: https://arks.princeton.edu/ark:/88435/dsp01nz8062179
      - type: poster
        title: The utility of speech-to-text software for transcription of verbal response data
        text: __Fitzpatrick P. C.__, Ziman K., Heusser A. C., Field C. E., Manning J. R. (2018). The utility of
         speech-to-text software for transcription of verbal response data. *Wetterhahn Science Symposium*. Hanover, NH.
        image: assets/img/research/wetterhahn-2018a.png
        pdf_url: https://www.dropbox.com/sh/bpyk9gwpk8wexfe/AABVGrxhxUar2cztUwSx7mBda?dl=0&preview=Wetterhahn_2018c.pdf
      - type: poster
        title: Adaptive free recall&#58; Enhancing (or diminishing) memory
        text: Lee M., Chacko R., Whitaker E., **Fitzpatrick P. C.**, Field C. E., Ziman K., Bollinger B., Heusser A. C., Manning J. R. (2018). Adaptive free recall&#58; Enhancing (or diminishing) memory. *Wetterhahn Science
         Symposium*. Hanover, NH.
        image: assets/img/research/wetterhahn-2018b.png
        pdf_url: https://www.dropbox.com/sh/bpyk9gwpk8wexfe/AABVGrxhxUar2cztUwSx7mBda?dl=0&preview=Wetterhahn_2018a.pdf
      - type: manuscript
        title: Is automatic speech-to-text transcription ready for use in psychological experiments?
        text: Ziman K., Heusser A. C., **Fitzpatrick P. C.**, Field C. E., Manning J. R. (2018). Is automatic
         speech-to-text transcription ready for use in psychological experiments?. *Behavior Research Methods*, 1-9.
        image: assets/img/research/autofr-paper-white.png
        pdf_url: https://link.springer.com/content/pdf/10.3758/s13428-018-1037-4.pdf
        code_url: https://github.com/ContextLab/AutoFR-analyses
        data_url: https://github.com/ContextLab/quail/tree/master/quail/data
      - type: manuscript
        title: Quail&#58; a Python toolbox for analyzing and plotting free recall data
        text: Heusser A. C., **Fitzpatrick P. C.**, Field C. E., Ziman K., Manning J. R. (2017). Quail&#58; a Python
         toolbox for analyzing and plotting free recall data. *The Journal of Open Source Software*, 2(18)&#58; 424.
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
        title: "Things I've made"
        items:
          - title: cluster-tools-dartmouth
            role: developer, maintainer
            description: _(in development)_ a Python package for interfacing with a TORQUE-based high-performance
             computing cluster entirely from your local machine. The `Cluster` class provides full `pathlib`- and 
             `subprocess`-like interfaces for reading, writing, uploading, and downloading remote files; spawning 
             remote processes; and creating and managing `Project`s. The `Project` class allows you to interactively 
             create, submit, and monitor batches of jobs remotely. Write your job script locally in any supported 
             language, supply its path, and manipulate the `Project`'s attributes to set TORQUE directives, create 
             a runtime environment, parameterize individual jobs, and more. `clustertools` will automatically 
             create a remote directory structure, upload your script, write `.pbs` wrapper files for each job, submit 
             them to the scheduler, and monitor their progress. `clustertools` can also run additional scripts before 
             job submission and after completion, email you about various changes in job status, and resubmit jobs that 
             are aborted due to scheduler issues. `clustertools` is specifically geared toward Dartmouth's
             [Discovery](https://rc.dartmouth.edu/index.php/discovery-overview/){:target="_blank"} cluster, but with 
             minor tweaks will work with any similar HPC system.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/paxtonfitzpatrick/cluster-tools-dartmouth
          - title: gittracker
            role: developer, maintainer
            description: _(in development)_ a Python command-line application for tracking the states of all your local 
             git repositories in one place. `gittracker` can be run from anywhere on your computer to show 
             `git status`-like information for each repository it's configured to track. It features simple `git`-like 
             commands; colorful, intuitive output at multiple verbosity levels; ability to track nested submodules; 
             and an automatic initial setup.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/paxtonfitzpatrick/gittracker
          - title: CDL-docker-stacks
            role: developer, maintainer
            description: a collection of hierarchically built Docker images for common neuro/data science applications. 
             Modeled after 
             [Jupyter Docker Stacks](https://jupyter-docker-stacks.readthedocs.io/en/latest/){:target="_blank"}, these 
             images provide lightweight, standardized environments useful for various research purposes. Each image is 
             available pre-built on [Docker Hub](https://hub.docker.com/u/contextlab){:target="_blank"} to pull and run 
             as-is or use as a base for custom images. Pre-built images that install Python support `3.6`, `3.7`, and 
             `3.8` tags for different Python versions 
             ([miniconda](https://docs.conda.io/en/latest/miniconda.html){:target="_blank"} distribution). Additionally, 
             `Dockerfile`s for each image are available on GitHub and support `--build-arg`s that allow customizing 
             features like the Linux distro, Python version, and [MTurk](https://www.mturk.com/){:target="_blank"} 
             compatibility; installing additional software through package managers including `apt`, `conda`, and `pip`; 
             and configuring the IP address and port for a Jupyter notebook server (as applicable).
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/CDL-docker-stacks
              - icon: fa-docker
                type: fab
                text: View on Docker Hub
                url: https://hub.docker.com/u/contextlab
          - title: quail
            role: co-developer, maintainer
            description: a Python toolbox for easily processing, analyzing, and visualizing free-recall data from both 
             list-learning and naturalistic memory experiments. Quail features a simple-yet-powerful data structure for 
             encoding and recall data (the `Egg`) with convenient methods for performing common analyses, generating 
             beautiful plots, and filtering data in numerous ways. Quail also integrates with the
             [Google Cloud Speech API](https://cloud.google.com/speech-to-text/){:target="_blank"} for rapid audio
             transcription and supports user-defined metrics for analyses in custom feature spaces.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/contextlab/quail
              - icon: fa-book
                type: fas
                text: documentation
                url: https://cdl-quail.readthedocs.io/en/latest/index.html
          - title: psiturk-experiment-template
            role: developer, maintainer
            description: An adaptable template for a behavioral experiment, ready to be run locally or deployed online 
             via [Amazon Mechanical Turk](https://www.mturk.com/){:target="_blank"}. The experiment is implemented 
             using the [jsPsych](http://www.jspsych.org/){:target="_blank"} library and 
             [psiTurk](https://psiturk.org/){:target="_blank"} platform, and isolated within a
             [Docker](https://www.docker.com/){:target="_blank"} application. The Docker application runs four networked
             containers&#58; a [Debian 9 ("stretch")](https://www.debian.org/releases/stretch/){:target="_blank"} 
             container to house the experiment code and psiTurk server; an 
             [nginx](https://www.nginx.com/){:target="_blank"} server for load balancing, 
             [MySQL](https://www.mysql.com/){:target="_blank"} for saving data; and 
             [Adminer](https://www.adminer.org/){:target="_blank"} for more easily accessing and downloading data. This 
             repository accompanied a tutorial on online data collection presented to the 
             [EPSCoR Attention Consortium](https://www.attentioninthebrain.com/){:target="_blank"}. 
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/paxtonfitzpatrick/psiturk-experiment-template
              - icon: fa-sticky-note
                type: fas
                text: Slides
                url: https://github.com/paxtonfitzpatrick/psiturk-experiment-template/tree/master/slides
          - title: autoFR
            role: co-developer, maintainer
            description: a verbal free-recall experiment that incorporates automatic speech-to-text processing by
             wrapping the [Google Cloud Speech API](https://cloud.google.com/speech-to-text/){:target="_blank"}. The 
             experiment is implemented using [jsPsych](http://www.jspsych.org/){:target="_blank"} and
             [psiTurk](https://psiturk.org/){:target="_blank"}, isolated in a
             [Docker](https://www.docker.com/){:target="_blank"} container for easy deployment both locally and via 
             [Amazon Mechanical Turk](https://www.mturk.com/mturk/welcome){:target="_blank"}. See the 
             [README](https://github.com/paxtonfitzpatrick/autoFR/blob/master/README.md){:target="_blank"} for 
             instructions on how to run the experiment and access the data.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/AutoFR
      - type: software.html
        title: Things I contribute to
        items:
          - title: hypertools
            role: maintainer
            description: a Python package for visualizing and manipulating high-dimensional data. HyperTools was built
             with two goals in mind&#58; quickly visualizing a dataset to gain intuitions about its structure, and
             meticulously manipulating data to generate beautiful, animated, 3D figures. It features heavily customizable
             functions for alignment, normalization, clustering, transformations, dimensionality reduction, and
             plotting, while simultaneously allowing you to plot a corpus of text with a single function call. Hypertools
             integrates many familiar libraries including [`matplotlib`](https://matplotlib.org/){:target="_blank"}, 
             [`seaborn`](https://seaborn.pydata.org/){:target="_blank"}, and 
             [`scikit-learn`](http://scikit-learn.org/){:target="_blank"}, along with custom implementations of 
             powerful tools such as 
             [hyperalignment](https://www.cell.com/neuron/fulltext/S0896-6273(11)00781-1?_returnURL=https%3A%2F%2Flinkinghub.elsevier.com%2Fretrieve%2Fpii%2FS0896627311007811%3Fshowall%3Dtrue){:target="_blank"} 
             and the 
             [Shared Response Model](https://papers.nips.cc/paper/5855-a-reduced-dimension-fmri-shared-response-model.pdf){:target="_blank"}.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/ContextLab/hypertools
              - icon: fa-book
                type: fas
                text: documentation
                url: https://hypertools.readthedocs.io/en/latest/
              - icon: fa-file-pdf
                type: fas
                text: JMLR paper
                url: http://jmlr.org/papers/volume18/17-434/17-434.pdf
          - title: umap-learn
            role: co-maintainer
            description: a Python package implementing the 
             [Uniform Manifold Approximation and Projection](https://arxiv.org/abs/1802.03426){:target="_blank"} 
             algorithm. UMAP is a general-purpose dimensionality reduction technique based on ideas from manifold
             learning and topological data analysis, founded on three assumptions about the data&#58; **1**) the data
             is uniformly distributed on a Riemannian manifold; **2**) the Riemannian metric is locally constant (or
             can be approximated as such); and **3**) the manifold is locally connected. Given these assumptions, UMAP 
             searches for a low-dimensional projection of the data whose fuzzy topological structure best matches
             that of the data in its original space. UMAP affords a number of notable advantages over similar techniques 
             (e.g., 
             [_t_-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding){:target="_blank"}) 
             such as significantly greater speed and scalability, better preservation of the data's global structure, 
             and the ability to transform new data into an existing embedding space. The Python implementation
             additionally supports a wide variety of metric and non-metric distance functions, supervised and 
             semi-supervised dimensionality reduction, and an inverse transformation.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/lmcinnes/umap
              - icon: fa-book
                type: fas
                text: documentation
                url: https://umap-learn.readthedocs.io/en/latest/
              - icon: fa-file-pdf
                type: fas
                text: arXiv paper
                url: https://arxiv.org/pdf/1802.03426.pdf
          - title: CDL-tutorials
            role: co-developer, co-maintainer
            description: a repository of useful, open-source tutorials on various computational tools, frameworks, 
             Python packages, and concepts frequently used in the 
             [Contextual Dynamics Lab](http://www.context-lab.com/){:target="_blank"}. Check out the GitHub repo for a
             full list of available (or soon to be available) tutorials.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/contextlab/cdl-tutorials
          - title: lab-manual
            role: co-developer, maintainer
            description: lab manual and associated source code for the 
             [Contextual Dynamics Lab](http://www.context-lab.com/){:target="_blank"} (PI&#58; 
             [Jeremy Mannning](https://pbs.dartmouth.edu/people/jeremy-rothman-manning){:target="_blank"}). In addition 
             to lab policies and practices, it contains useful guides for tools and techniques frequently used in the
             CDL, as well as serves as the lab's on-boarding platform for new members. We've chosen to share it
             publicly in the hopes that others may find its format, content, or philosophy useful, or offer us
             feedback on how to improve.
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/contextlab/lab-manual
              - icon: fa-file-pdf
                type: fas
                text: Download PDF
                url: https://github.com/ContextLab/lab-manual/raw/master/lab_manual.pdf
          - title: CDL-bibliography
            role: co-maintainer
            description: a `bibtex` file containing nearly 6,000 references related to psychology, neuroscience, math, 
             and machine learning. The bibliography can be easily configured as a submodule for reference in LaTeX 
             documents or added to [Overleaf](https://www.overleaf.com/){:target="_blank"} projects, and is updated
             regularly. The CDL bibliography is built off of a similar file created by the 
             [Computational Memory Lab at the University of Pennsylvania](http://memory.psych.upenn.edu/){:target="_blank"} 
             (PI&#58; [Mike Kahana](https://psychology.sas.upenn.edu/people/michael-kahana){:target="_blank"}).
            icons:
              - icon: fa-github-square
                type: fab
                text: View on GitHub
                url: https://github.com/contextlab/cdl-bibliography
        
  - type: contact.html
    section_id: contact
    background_style: bg-primary
    title: Get in touch
    map_embed: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d721.038682728594!2d-72.28847647071619!3d43.70733339869497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb4c9c361e1ddb1%3A0x8b2bba0d5b098fa6!2sMoore%20Psychology%20Bldg%2C%20Hanover%2C%20NH%2003755!5e0!3m2!1sen!2sus!4v1591571050608!5m2!1sen!2sus
      
---

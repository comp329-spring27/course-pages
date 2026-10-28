window.COURSE = {
  "source_sha256": "38b284421fe122558176ce0658d6e3c748a12a2bfca54bae747dadd33f42f6fa",
  "schedule": [
    {
      "week": "Week 0",
      "dates": "Before Jan 11",
      "note": [],
      "lecture1": [
        "Getting ready: self-paced primer and self-check; activate your cluster account."
      ],
      "lecture2": [],
      "events": [
        "Primer (ungraded)"
      ],
      "block": "shared"
    },
    {
      "week": "Week 1",
      "dates": "Jan 11–15",
      "note": [],
      "lecture1": [
        "Joint introduction to AI systems",
        "Follow a workload through storage, frameworks, accelerators, and communication.  CONCEPT"
      ],
      "lecture2": [
        "Joint foundations for measurement",
        "Estimate bytes, FLOPs, time, dollars, and joules; predict and measure a bottleneck.  BUILD"
      ],
      "events": [
        "Lab 1 out",
        "D1 out (Fri)",
        "Dataset contract published"
      ],
      "block": "shared"
    },
    {
      "week": "Week 2",
      "dates": "Jan 18–22",
      "note": [
        "No class Mon, Jan 18 (MLK Day)"
      ],
      "lecture1": [
        "Collecting and storing raw data",
        "Sources, licensing, provenance, privacy; XML, JSON Lines, compression, and Parquet.  CONCEPT",
        "Stream large files into records.  BUILD"
      ],
      "lecture2": [
        "From one machine to many",
        "Map, shuffle, reduce; failure recovery, strong and weak scaling.  CONCEPT",
        "Implement a small MapReduce computation.  BUILD"
      ],
      "events": [
        "Lab 1 due",
        "D1 checkpoint",
        "Lab 2 out (after Lecture 2)"
      ],
      "block": "data"
    },
    {
      "week": "Week 3",
      "dates": "Jan 25–29",
      "note": [],
      "lecture1": [
        "Spark and declarative execution",
        "RDDs, lazy execution, stages, tasks, and lineage; relational algebra.  CONCEPT",
        "Express jobs with DataFrames and SQL; inspect the Spark UI.  BUILD"
      ],
      "lecture2": [
        "Spark performance",
        "Join strategies, partitions, data skew, Python UDFs, and shuffle costs.  CONCEPT",
        "Measure execution and justify a configuration change.  BUILD"
      ],
      "events": [
        "D1 due",
        "D2 out (after Lecture 2)",
        "Lab 2 due (after Spark lecture)"
      ],
      "block": "data"
    },
    {
      "week": "Week 4",
      "dates": "Feb 1–5",
      "note": [],
      "lecture1": [
        "Cleaning and quality filtering",
        "Normalization, language ID, quality rules, PII, and contamination.  CONCEPT",
        "Apply provided rules and validate against a reference.  BUILD"
      ],
      "lecture2": [
        "Deduplication",
        "Exact hashes, Jaccard similarity, MinHash, and LSH.  CONCEPT",
        "Implement near-duplicate detection in Spark.  BUILD"
      ],
      "events": [
        "D2 checkpoint",
        "D3 out (after Lecture 2)"
      ],
      "block": "data"
    },
    {
      "week": "Week 5",
      "dates": "Feb 8–12",
      "note": [
        "No class Thu–Fri, Feb 11–12 (recess)"
      ],
      "lecture1": [
        "Tokenization at scale",
        "BPE vocabulary construction and tokenizer trade-offs.  CONCEPT",
        "Train on a sample with the provided trainer; tokenize in parallel.  BUILD",
        "Implement BPE training yourself.  STRETCH"
      ],
      "lecture2": [
        "University recess",
        "No second lecture this week."
      ],
      "events": [
        "D2 due (Wed, before recess)"
      ],
      "block": "data"
    },
    {
      "week": "Week 6",
      "dates": "Feb 15–19",
      "note": [],
      "lecture1": [
        "Building the dataset",
        "Leak-free splits, binary shards, memory mapping, and global shuffling.  CONCEPT",
        "Write shards and pass the dataset contract checker.  BUILD"
      ],
      "lecture2": [
        "Streaming and loading data",
        "Partition shards among workers; disjoint samples and deterministic resume.  CONCEPT",
        "Measure a supplied data consumer; diagnose I/O limits.  BUILD"
      ],
      "events": [
        "D3 checkpoint (dedup)"
      ],
      "block": "data"
    },
    {
      "week": "Week 7",
      "dates": "Feb 22–26",
      "note": [],
      "lecture1": [
        "Data quality and documentation",
        "Ablations, contamination checks, and dataset documentation; interpret staff-provided model evaluations.  CONCEPT"
      ],
      "lecture2": [
        "Data systems design review",
        "Use traces and cost models to explain pipeline bottlenecks and scaling limits; midterm review.  CONCEPT"
      ],
      "events": [
        "D3 due",
        "Capstone spec out",
        "Midterm review"
      ],
      "block": "data"
    },
    {
      "week": "Week 8",
      "dates": "Mar 1–5",
      "note": [],
      "lecture1": [
        "GPU architecture",
        "SIMT, warps, compute units; registers, shared memory, caches, and HBM.  CONCEPT",
        "Predict a kernel bottleneck with the roofline model.  BUILD"
      ],
      "lecture2": [
        "GPU programming model",
        "Threads, blocks, grids, coalescing, synchronization, and streams.  CONCEPT",
        "Triton blocks, masks, and reductions; correct timing and tests.  BUILD"
      ],
      "events": [
        "Midterm (data systems), evening TBA",
        "T1 and Lab 3 out (after midterm and Lecture 2)"
      ],
      "block": "training"
    },
    {
      "week": "Week 9",
      "dates": "Mar 8–12",
      "note": [],
      "lecture1": [
        "Framework fundamentals",
        "PyTorch tensors, storage/layout, operator dispatch, and the forward pass; autograd as a provided tool.  CONCEPT",
        "Trace a supplied training step and its memory use.  BUILD"
      ],
      "lecture2": [
        "Graphs and transformations",
        "PyTorch eager and compiled execution; JAX vmap and jit; tracing and graph breaks.  CONCEPT",
        "Compare execution modes; separate compile and runtime costs.  BUILD"
      ],
      "events": [
        "T1 checkpoint (before break)"
      ],
      "block": "training"
    },
    {
      "week": "Break",
      "dates": "Mar 13–21",
      "note": [],
      "lecture1": [
        "Spring break"
      ],
      "lecture2": [],
      "events": [
        "Nothing due"
      ],
      "block": "shared"
    },
    {
      "week": "Week 10",
      "dates": "Mar 22–26",
      "note": [],
      "lecture1": [
        "Framework and GPU interaction",
        "Fusion, allocation, framework data loaders, asynchronous transfers, and precision.  CONCEPT",
        "Integrate a kernel; profile and test a bottleneck hypothesis.  BUILD"
      ],
      "lecture2": [
        "Distributed programming foundations",
        "Processes, ranks, device mapping, synchronization, and collective semantics.  CONCEPT",
        "mpi4py messages; model latency and bandwidth.  BUILD"
      ],
      "events": [
        "T1 due",
        "Lab 3 due (after Lecture 1)",
        "T2 and Lab 4 out (after Lecture 2)"
      ],
      "block": "training"
    },
    {
      "week": "Week 11",
      "dates": "Mar 29–Apr 2",
      "note": [],
      "lecture1": [
        "NCCL and GPU communication",
        "Communicators, all-reduce, reduce-scatter, all-gather, ring/tree ideas, and ordering.  CONCEPT",
        "Test torch.distributed/NCCL results and completion.  BUILD"
      ],
      "lecture2": [
        "Multi-server communication",
        "Topology, launch, timeouts, hangs, and matching operations.  CONCEPT",
        "Guided two-server benchmarks; fit an α–β model.  BUILD"
      ],
      "events": [
        "T2 checkpoint",
        "Lab 4 due (after Lecture 2)"
      ],
      "block": "training"
    },
    {
      "week": "Week 12",
      "dates": "Apr 5–9",
      "note": [],
      "lecture1": [
        "Data parallelism and sharding",
        "Replicated models, gradient averaging, batch conventions, DDP, ZeRO, and FSDP.  CONCEPT",
        "Check a distributed update; account for memory.  BUILD"
      ],
      "lecture2": [
        "Tensor and model parallelism",
        "Partition linear operators; row/column layouts and activation/gradient communication.  CONCEPT",
        "Guided tensor-parallel exercise and per-rank memory estimates.  BUILD"
      ],
      "events": [
        "T2 due",
        "T3 out (after Lecture 1)",
        "Lab 5 out (after Lecture 2)"
      ],
      "block": "training"
    },
    {
      "week": "Week 13",
      "dates": "Apr 12–16",
      "note": [],
      "lecture1": [
        "Pipeline and 3D parallelism",
        "Layer stages, microbatches, pipeline bubbles; data × tensor × pipeline layouts.  CONCEPT",
        "Guided pipeline exercise and simulated 3D cost analysis.  BUILD"
      ],
      "lecture2": [
        "Diagnosing distributed systems",
        "Profile overlap, stragglers, utilization, and GPU energy.  BUILD",
        "Checkpoint/restart consistency, recovery, and reproducible scaling.  CONCEPT"
      ],
      "events": [
        "T3 checkpoint (after Lecture 1)",
        "Lab 5 due (after Lecture 1)",
        "Capstone pairs set"
      ],
      "block": "training"
    },
    {
      "week": "Week 14",
      "dates": "Apr 19–23",
      "note": [
        "Last class: Fri, Apr 23"
      ],
      "lecture1": [
        "Joint end-to-end integration",
        "Connect data execution to training performance; use traces and cost models to justify a design.  CONCEPT"
      ],
      "lecture2": [
        "Joint systems design review",
        "Compare layouts, resource limits, and failure modes; synthesize both blocks and review for the final.  CONCEPT"
      ],
      "events": [
        "T3 due"
      ],
      "block": "shared"
    },
    {
      "week": "Finals",
      "dates": "Apr 28–May 4",
      "note": [],
      "lecture1": [
        "Final examination period"
      ],
      "lecture2": [],
      "events": [
        "Final exam",
        "Capstone due (Tue, May 4)"
      ],
      "block": "shared"
    }
  ],
  "assignments": [
    {
      "code": "D1",
      "title": "Collect",
      "due": "Due Week 3",
      "date": "2027-01-29",
      "build": "Stream-parse a Wikipedia dump into Parquet. An approved library handles wikitext markup.",
      "study": "Throughput vs. worker count; find the bottleneck; estimate full-dump time and cost.",
      "thread": "data"
    },
    {
      "code": "D2",
      "title": "Process",
      "due": "Due Week 5 (Wed, before recess)",
      "date": "2027-02-10",
      "build": "Apply the provided normalization rules to the corpus and compute statistics with Spark DataFrames and SQL. Tests compare your output with a single-machine run.",
      "study": "Strong and weak scaling; effect of partition count.",
      "thread": "data"
    },
    {
      "code": "D3",
      "title": "Build the dataset",
      "due": "Due Week 7",
      "date": "2027-02-26",
      "build": "Deduplicate with MinHash and LSH in Spark (the checkpoint). Then use the provided BPE trainer to train a tokenizer on a sample you choose, tokenize the corpus in parallel, and write shards that pass the contract checker. Quality filters, the tokenizer, and a shard writer are provided from day one. Stretch: write BPE training yourself.",
      "study": "Dedup cost vs. corpus size; LSH accuracy vs. time; tokens per second.",
      "thread": "data"
    },
    {
      "code": "T1",
      "title": "GPU and framework execution",
      "due": "Due Week 10",
      "date": "2027-03-26",
      "build": "Implement one Triton reduction or fused elementwise kernel and validate it against PyTorch. Integrate it into the forward pass of a supplied workload using your D3 dataset; compare PyTorch eager and compiled execution and a guided JAX equivalent. Model, autograd, optimizer, and data loader are provided. Checkpoint: correct kernel and timing harness.",
      "study": "Predict memory traffic and arithmetic intensity; vary input and batch size. Separate compile, launch, and steady-state costs; explain the observed bottleneck with a trace.",
      "thread": "training"
    },
    {
      "code": "T2",
      "title": "Distributed programming",
      "due": "Due Week 12",
      "date": "2027-04-09",
      "build": "Implement one small CPU all-reduce with mpi4py point-to-point messages; other primitives are provided. Build a torch.distributed/NCCL benchmark for GPU collectives and run a guided two-server case. Test results, rank/device mapping, and operation ordering. Checkpoint: correct collectives on small tensors.",
      "study": "Vary message size, rank count, and topology. Fit latency and bandwidth; compare predictions with measured time and diagnose synchronization or communication limits.",
      "thread": "training"
    },
    {
      "code": "T3",
      "title": "Parallel training systems",
      "due": "Due Week 14",
      "date": "2027-04-23",
      "build": "Implement data-parallel gradient averaging and compare one update with a single-process reference and PyTorch DDP. Train on D3 data. Complete guided tensor- and pipeline-parallel exercises with supplied code and a deeper toy model. Analyze a 3D DP × TP × PP layout using a supplied simulator. Checkpoint: correct DP update and basic layout tests. Full 3D training is optional.",
      "study": "Compare replicated and sharded state, communication volume, pipeline bubbles, and scaling efficiency. State the batch convention; justify a layout under a fixed GPU/memory budget and measure full DP training.",
      "thread": "training"
    }
  ],
  "handouts": {
    "D1": "https://github.com/comp329-spring27/student-assignments/blob/main/01_d1_collect/README.md",
    "D2": "https://github.com/comp329-spring27/student-assignments/blob/main/02_d2_spark/README.md",
    "D3": "https://github.com/comp329-spring27/student-assignments/blob/main/03_d3_dataset/README.md",
    "T1": "https://github.com/comp329-spring27/student-assignments/blob/main/04_t1_numpy/README.md",
    "T2": "https://github.com/comp329-spring27/student-assignments/blob/main/05_t2_triton/README.md",
    "T3": "https://github.com/comp329-spring27/student-assignments/blob/main/06_t3_scale_out/README.md",
    "Capstone": "https://github.com/comp329-spring27/student-assignments/blob/main/07_capstone/README.md"
  },
  "glossary": [
    {
      "term": "Partition",
      "meaning": "A slice of a dataset handled by one worker."
    },
    {
      "term": "Shuffle",
      "meaning": "Moving data between workers by key, over the network."
    },
    {
      "term": "Data skew",
      "meaning": "Uneven partitions, so a few workers do most of the work."
    },
    {
      "term": "Lineage",
      "meaning": "How a dataset was computed; Spark uses it to rebuild lost data."
    },
    {
      "term": "MinHash and LSH",
      "meaning": "Hashing tricks that find similar documents without comparing every pair."
    },
    {
      "term": "BPE",
      "meaning": "Byte-pair encoding: a tokenizer that repeatedly merges the most common pair of symbols."
    },
    {
      "term": "Byte-level tokens",
      "meaning": "Each byte of text is one token (256 possible). Used for small illustrative workloads; the main training assignments use the BPE dataset from D3."
    },
    {
      "term": "Shard",
      "meaning": "One file of a dataset split across many files."
    },
    {
      "term": "Dataset contract",
      "meaning": "The written format that D3 produces and T1 and T3 read."
    },
    {
      "term": "Memory mapping",
      "meaning": "Reading a file as an array, loading pages only when used."
    },
    {
      "term": "Bits per byte",
      "meaning": "Loss per byte of raw text, so different tokenizers compare fairly."
    },
    {
      "term": "FLOP",
      "meaning": "One floating-point operation (an add or a multiply)."
    },
    {
      "term": "Arithmetic intensity",
      "meaning": "FLOPs per byte moved to or from memory."
    },
    {
      "term": "Roofline model",
      "meaning": "Attainable speed ≤ min(peak compute, bandwidth × arithmetic intensity)."
    },
    {
      "term": "Kernel",
      "meaning": "A function that runs on the GPU across many threads."
    },
    {
      "term": "HBM",
      "meaning": "The GPU’s main memory: large but slower than on-chip memory."
    },
    {
      "term": "Tile",
      "meaning": "A small block of a matrix kept in fast memory and reused."
    },
    {
      "term": "CUDA stream",
      "meaning": "A queue of GPU work that runs in order; separate streams can overlap."
    },
    {
      "term": "Collective",
      "meaning": "A communication step that involves every GPU in a group."
    },
    {
      "term": "All-reduce",
      "meaning": "Every GPU sends a vector and receives the sum. It equals a reduce-scatter followed by an all-gather."
    },
    {
      "term": "Reduce-scatter",
      "meaning": "Every GPU sends a vector and receives one slice of the sum."
    },
    {
      "term": "All-gather",
      "meaning": "Every GPU sends one slice and receives all slices."
    },
    {
      "term": "α–β model",
      "meaning": "Sending n bytes takes about α + nβ (latency plus size ÷ bandwidth)."
    },
    {
      "term": "Data parallelism",
      "meaning": "Partition examples across workers and synchronize gradients; the model is replicated, though its state may also be sharded."
    },
    {
      "term": "Tensor parallelism",
      "meaning": "Partition tensors and operations within a layer across devices, communicating partial results or inputs as needed."
    },
    {
      "term": "ZeRO",
      "meaning": "Data parallelism that splits optimizer state (and optionally more) across GPUs."
    },
    {
      "term": "MFU",
      "meaning": "Model FLOP/s achieved ÷ peak FLOP/s of all GPUs used, at the stated precision."
    },
    {
      "term": "Strong and weak scaling",
      "meaning": "Strong: fixed problem, more workers. Weak: problem grows with workers."
    },
    {
      "term": "SIMT",
      "meaning": "Single instruction, multiple threads: GPU threads execute in groups, with costs from divergent paths and memory access patterns."
    },
    {
      "term": "Autograd",
      "meaning": "Automatic differentiation that tracks operations and computes gradients; its saved intermediates and execution affect memory and runtime."
    },
    {
      "term": "Operator dispatch",
      "meaning": "Selecting the implementation of an operation for its tensor properties and execution backend."
    },
    {
      "term": "Graph compilation",
      "meaning": "Transforming captured operations into executable code; compilation and graph breaks affect performance."
    },
    {
      "term": "Rank and process group",
      "meaning": "A rank identifies a process within a group whose members participate in communication."
    },
    {
      "term": "NCCL",
      "meaning": "NVIDIA library providing GPU communication primitives, including collectives, within and across servers."
    },
    {
      "term": "Model parallelism",
      "meaning": "Distributing a model’s computation across devices, including tensor and pipeline parallelism."
    },
    {
      "term": "Pipeline parallelism",
      "meaning": "Partition layers into stages; pass microbatches between stages, balancing work and idle pipeline bubbles."
    },
    {
      "term": "3D parallelism",
      "meaning": "Compose data, tensor, and pipeline parallelism. In a simple rectangular layout, GPU count is DP × TP × PP."
    },
    {
      "term": "FSDP",
      "meaning": "Fully sharded data parallelism: shard model state across data-parallel workers and communicate it when needed."
    }
  ],
  "labs": [
    {
      "name": "Lab 1",
      "description": "Set up the environment and run a cluster job. Measure CPU matrix multiplication and identify compute and memory costs.",
      "weeks": "1–2"
    },
    {
      "name": "Lab 2",
      "description": "Write a MapReduce word count in plain Python, then in PySpark.",
      "weeks": "2–3"
    },
    {
      "name": "Lab 3",
      "description": "GPU and framework lab: inspect memory access, write a small Triton kernel, and trace PyTorch eager/compiled execution with a guided JAX comparison.",
      "weeks": "8–10"
    },
    {
      "name": "Lab 4",
      "description": "Communication lab: rank/device mapping, CPU messages, NCCL collectives, and a guided two-server run; fit latency and bandwidth.",
      "weeks": "10–11"
    },
    {
      "name": "Lab 5",
      "description": "Parallelism lab: guided tensor and pipeline partitions of a supplied toy model; measure communication and pipeline bubbles; map a 3D layout.",
      "weeks": "12–13"
    }
  ],
  "readings": [
    "Data systems block",
    "Dean and Ghemawat, “MapReduce: Simplified Data Processing on Large Clusters,” OSDI 2004.",
    "Zaharia et al., “Resilient Distributed Datasets: A Fault-Tolerant Abstraction for In-Memory Cluster Computing,” NSDI 2012.",
    "Armbrust et al., “Spark SQL: Relational Data Processing in Spark,” SIGMOD 2015.",
    "Leskovec, Rajaraman, and Ullman, Mining of Massive Datasets, Chapter 3.",
    "Sennrich, Haddow, and Birch, “Neural Machine Translation of Rare Words with Subword Units,” ACL 2016.",
    "Lee et al., “Deduplicating Training Data Makes Language Models Better,” ACL 2022.",
    "Penedo et al., “The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale,” NeurIPS 2024 (Datasets and Benchmarks).",
    "Training systems block",
    "NVIDIA, CUDA Programming Guide: execution hierarchy, GPU memory, synchronization, and streams. CUDA guide",
    "PyTorch documentation: tensors, operator dispatch, and torch.compile; JAX documentation: vmap, jit, and asynchronous execution. PyTorch dispatch · Compilation · JAX transformations",
    "Williams, Waterman, and Patterson, “Roofline: An Insightful Visual Performance Model for Multicore Architectures,” CACM 2009.",
    "Tillet, Kung, and Cox, “Triton: An Intermediate Language and Compiler for Tiled Neural Network Computations,” MAPL 2019.",
    "NVIDIA, NCCL User Guide: collectives, process and device mapping, ordering, and synchronization. PyTorch Distributed Overview: communication primitives and parallel execution. NCCL ordering · Distributed overview",
    "Narayanan et al., “Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM,” SC 2021: composing data, tensor, and pipeline parallelism. Paper",
    "Rajbhandari et al., “ZeRO: Memory Optimizations Toward Training Trillion Parameter Models,” SC 2020.",
    "Bengio et al., “A Neural Probabilistic Language Model,” JMLR 2003, for the supplied workload.",
    "Thakur, Rabenseifner, and Gropp, “Optimization of Collective Communication Operations in MPICH,” IJHPCA 2005, for collective cost models."
  ]
};

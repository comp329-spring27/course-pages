window.COURSE = {
  "source_sha256": "183111ed73bda3ecefdc4d4a3385a2b2fcb214ca4f9dc004e9fe98f6d3ba5494",
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
        "Relations and the relational model",
        "A training corpus is data like any other. Treating it as a set of tuples with a schema lets us describe it and query it precisely.  WHY",
        "Describe data as relations with attributes, domains, and keys, and model Wikipedia as a set of relations.  WE WILL",
        "Relations, attributes, domains, schemas, and keys; Wikipedia as articles, revisions, links, and categories.  CONCEPT"
      ],
      "lecture2": [
        "Storing relations: rows versus columns",
        "How a relation is laid out on disk decides how many bytes a query must read.  WHY",
        "Compare row-oriented and columnar storage, and store Wikipedia records in Parquet.  WE WILL",
        "Row-oriented versus columnar storage; Parquet.  CONCEPT",
        "Stream a Wikipedia dump into Parquet records.  BUILD"
      ],
      "events": [
        "Lab 1 out",
        "D1 out (Fri)",
        "Dataset contract published"
      ],
      "block": "data"
    },
    {
      "week": "Week 2",
      "dates": "Jan 18–22",
      "note": [
        "No class Mon, Jan 18 (MLK Day)"
      ],
      "lecture1": [
        "Relational algebra",
        "Before running a query on many machines, we need a precise language for what it computes.  WHY",
        "Write queries as compositions of a few operators, and build a join from them.  WE WILL",
        "Selection, projection, union, difference, and Cartesian product; join as a derived operator; grouping and aggregation.  CONCEPT"
      ],
      "lecture2": [
        "Relational calculus and SQL",
        "SQL is how most people query data, and it is the algebra and calculus in practice.  WHY",
        "Write the same queries in tuple relational calculus and in SQL, and see why the two languages are equivalent.  WE WILL",
        "Tuple relational calculus and its equivalence with the algebra; SELECT/FROM/WHERE, JOIN, and GROUP BY.  CONCEPT"
      ],
      "events": [
        "Lab 1 due",
        "D1 checkpoint"
      ],
      "block": "data"
    },
    {
      "week": "Week 3",
      "dates": "Jan 25–29",
      "note": [],
      "lecture1": [
        "Spark: from one machine to many",
        "A full corpus outgrows one machine’s memory, disk, and I/O. Spark splits the work across many machines.  WHY",
        "See how Spark runs a job with a driver and executors, and why transformations wait for an action.  WE WILL",
        "Data larger than RAM; driver and executors; jobs, stages, and tasks; RDDs, lazy evaluation, and transformations versus actions.  CONCEPT"
      ],
      "lecture2": [
        "Partitions, the shuffle, and Spark SQL",
        "The same Spark job can run many times faster or slower depending on how its data is partitioned and moved.  WHY",
        "Write a job with PySpark DataFrames and Spark SQL, and find where it shuffles.  WE WILL",
        "Partitions and the shuffle; DataFrames and Spark SQL in PySpark.  CONCEPT",
        "Express jobs with DataFrames and SQL; inspect the Spark UI.  BUILD"
      ],
      "events": [
        "D1 due",
        "Lab 2 out (after Lecture 1)",
        "D2 out (after Lecture 2)"
      ],
      "block": "data"
    },
    {
      "week": "Week 4",
      "dates": "Feb 1–5",
      "note": [],
      "lecture1": [
        "Tokenization and byte-pair encoding",
        "Models read integer tokens, not characters. The tokenizer sets sequence length, and with it the cost of every training step.  WHY",
        "Compare characters, words, and subwords, and run the BPE merge loop by hand.  WE WILL",
        "Characters versus words versus subwords; vocabulary size; BPE pair counting and the merge loop; pre-tokenization and normalization (whitespace, case, Unicode).  CONCEPT"
      ],
      "lecture2": [
        "Tokenization at scale with Spark",
        "Counting pairs over a whole corpus is too slow on one machine, but it is just an aggregation.  WHY",
        "Write BPE training as Spark jobs, and encode the full corpus with a trained vocabulary.  WE WILL",
        "Pair counting as aggregation; merges as iterations; encoding the corpus in parallel.  CONCEPT",
        "Train on a sample with the provided trainer; tokenize in parallel.  BUILD",
        "Implement BPE training yourself.  STRETCH"
      ],
      "events": [
        "D2 checkpoint",
        "Lab 2 due",
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
        "Processes and threads",
        "One core is not enough. Using many means choosing between processes and threads, and controlling what they share.  WHY",
        "Run work in parallel with Python threads and processes, and find a race and a deadlock.  WE WILL",
        "Processes versus threads (address spaces, scheduling); concurrency versus parallelism; Amdahl’s law; races, locks, and deadlock; the GIL, threading versus multiprocessing.  CONCEPT"
      ],
      "lecture2": [
        "University recess",
        "No second lecture this week."
      ],
      "events": [
        "D2 due (Wed, before recess)"
      ],
      "block": "training"
    },
    {
      "week": "Week 6",
      "dates": "Feb 15–19",
      "note": [],
      "lecture1": [
        "Networking: latency, bandwidth, and sockets",
        "Once work spans machines, every byte crosses a network. Its cost decides whether more machines help.  WHY",
        "Model a message as α + βn, and send data over TCP and UDP sockets.  WE WILL",
        "Latency versus bandwidth and the α + βn cost of a message; sockets; TCP versus UDP.  CONCEPT"
      ],
      "lecture2": [
        "Serialization, RPC, and datacenter networks",
        "Programs exchange objects, not bytes, and datacenter networks move bytes much faster than ordinary Ethernet.  WHY",
        "Turn objects into messages, call a function on another machine, and compare datacenter interconnects.  WE WILL",
        "Serialization; remote procedure calls; Ethernet, InfiniBand, and RDMA.  CONCEPT"
      ],
      "events": [
        "D3 checkpoint (dedup)"
      ],
      "block": "training"
    },
    {
      "week": "Week 7",
      "dates": "Feb 22–26",
      "note": [],
      "lecture1": [
        "Message passing",
        "Distributed programs coordinate by sending messages, and getting the order wrong makes a program hang.  WHY",
        "Write rank-based programs with mpi4py, and see when blocking sends deadlock.  WE WILL",
        "Ranks; point-to-point send and receive; blocking versus non-blocking.  CONCEPT",
        "mpi4py messages; fit latency and bandwidth.  BUILD"
      ],
      "lecture2": [
        "Collective communication",
        "Many programs need the same few patterns: share, collect, and sum. A collective does each in one call, faster than hand-written messages.  WHY",
        "Use the standard collectives, build all-reduce from reduce-scatter and all-gather, and count the cost of a tree.  WE WILL",
        "Broadcast, scatter, gather, reduce, all-reduce, all-gather, and reduce-scatter; all-reduce = reduce-scatter + all-gather; tree-based collectives and their cost.  CONCEPT"
      ],
      "events": [
        "D3 due",
        "Capstone spec out",
        "T2 and Lab 4 out (after Lecture 2)",
        "Midterm review"
      ],
      "block": "training"
    },
    {
      "week": "Week 8",
      "dates": "Mar 1–5",
      "note": [],
      "lecture1": [
        "All-reduce: rings and trees",
        "GPUs that train together sum their gradients at every step. A good algorithm keeps that cost almost independent of the number of GPUs.  WHY",
        "Derive the ring all-reduce and its cost, and choose between a ring and a tree by message size.  WE WILL",
        "Ring all-reduce and its cost; tree versus ring by message size.  CONCEPT"
      ],
      "lecture2": [
        "NCCL and interconnect topology",
        "GPUs talk over links of very different speeds. NCCL picks the algorithm and the path, if every rank calls it correctly.  WHY",
        "Call NCCL collectives from torch.distributed, and see how NVLink, PCIe, and InfiniBand set their speed.  WE WILL",
        "NCCL and torch.distributed; interconnect topology: NVLink, PCIe, and InfiniBand.  CONCEPT",
        "Benchmark NCCL collectives and check their results.  BUILD"
      ],
      "events": [
        "Midterm (Weeks 1–7), evening TBA"
      ],
      "block": "training"
    },
    {
      "week": "Week 9",
      "dates": "Mar 8–12",
      "note": [],
      "lecture1": [
        "Data parallelism",
        "The simplest way to use N GPUs is to give each one part of the batch, but then every GPU holds the whole model.  WHY",
        "Count where memory goes in a training step, and train one model on several GPUs by averaging gradients.  WE WILL",
        "Parameters, gradients, optimizer state, and activations; synchronous data parallelism: shard the batch, all-reduce the gradients; Distributed Data Parallel.  CONCEPT",
        "Check a distributed update against a single-process reference.  BUILD"
      ],
      "lecture2": [
        "Sharding the state: ZeRO and FSDP",
        "Replication wastes memory: N GPUs store N copies of the same state.  WHY",
        "Split optimizer state, gradients, and parameters across GPUs, and count what each choice costs in memory and communication.  WE WILL",
        "ZeRO and Fully Sharded Data Parallel; memory versus communication.  CONCEPT"
      ],
      "events": [
        "T2 checkpoint",
        "Lab 4 due"
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
        "Tensor parallelism",
        "When one layer is too large or too slow for one GPU, split its matrices across GPUs.  WHY",
        "Split a linear layer by columns and by rows, and work out what each GPU stores and sends.  WE WILL",
        "Column- and row-parallel linear layers (Megatron).  CONCEPT",
        "Guided tensor-parallel exercise and per-rank memory estimates.  BUILD"
      ],
      "lecture2": [
        "Pipeline and 3D parallelism",
        "The largest models combine data, tensor, and pipeline splits, because each one alone runs out of memory or bandwidth.  WHY",
        "Cut a model into pipeline stages, measure the idle time, and choose a 3D layout for a fixed GPU budget.  WE WILL",
        "Stages, micro-batches, and the pipeline bubble; combining data, tensor, and pipeline parallelism.  CONCEPT",
        "Guided pipeline exercise and simulated 3D cost analysis.  BUILD"
      ],
      "events": [
        "T2 due",
        "T3 and Lab 5 out (after Lecture 2)"
      ],
      "block": "training"
    },
    {
      "week": "Week 11",
      "dates": "Mar 29–Apr 2",
      "note": [],
      "lecture1": [
        "Distributed matrix multiplication in 2D",
        "Matrix multiplication is the unit of ML work. When the matrices span many processors, the communication pattern sets the speed.  WHY",
        "Multiply matrices on a √p × √p processor grid with Cannon’s algorithm and SUMMA, and count the communication.  WE WILL",
        "Matrix multiply as the unit of ML work; Cannon’s algorithm and SUMMA; communication cost on a √p × √p grid.  CONCEPT"
      ],
      "lecture2": [
        "3D matrix multiplication and tensor parallelism",
        "Extra memory can buy less communication, and tensor parallelism is one point on that trade-off.  WHY",
        "Multiply on a ∛p × ∛p × ∛p grid, and read tensor parallelism as a 1D or 2D decomposition.  WE WILL",
        "The 3D algorithm: trading memory for communication; tensor parallelism as a 1D/2D decomposition.  CONCEPT"
      ],
      "events": [
        "T3 checkpoint",
        "Lab 5 due (after Lecture 2)"
      ],
      "block": "training"
    },
    {
      "week": "Week 12",
      "dates": "Apr 5–9",
      "note": [],
      "lecture1": [
        "GPU architecture",
        "A training step is millions of multiply-adds that a CPU runs too slowly; a GPU runs them in parallel if the work is shaped for it.  WHY",
        "Compare latency- and throughput-oriented processors, and map threads, warps, blocks, and grids onto the GPU.  WE WILL",
        "CPUs versus GPUs; streaming multiprocessors, CUDA cores, and tensor cores; threads, warps, thread blocks, and grids; SIMT and warp divergence.  CONCEPT"
      ],
      "lecture2": [
        "The GPU execution model",
        "A GPU hides slow memory by keeping many warps ready, but every kernel launch and host transfer costs time.  WHY",
        "Reason about occupancy and latency hiding, and measure the cost of kernel launches and host-to-device copies.  WE WILL",
        "Latency hiding by warp scheduling; occupancy; kernels and kernel launches; host-to-device transfers.  CONCEPT"
      ],
      "events": [
        "T3 due",
        "T1 and Lab 3 out (after Lecture 2)"
      ],
      "block": "training"
    },
    {
      "week": "Week 13",
      "dates": "Apr 12–16",
      "note": [],
      "lecture1": [
        "The GPU memory hierarchy",
        "Most GPU kernels wait on memory, not arithmetic. Where data lives decides how fast it arrives.  WHY",
        "Compare registers, shared memory, L2, and HBM, and see how coalesced access uses bandwidth well.  WE WILL",
        "Registers, shared memory, L2, and high-bandwidth memory: capacity and bandwidth at each level; memory coalescing.  CONCEPT"
      ],
      "lecture2": [
        "Arithmetic intensity and the roofline model",
        "Before optimizing a kernel, you need to know whether arithmetic or memory limits it.  WHY",
        "Compute arithmetic intensity, and use the roofline model to predict a kernel’s bottleneck.  WE WILL",
        "Arithmetic intensity; the roofline model; memory-bound versus compute-bound operations.  CONCEPT",
        "Predict a kernel bottleneck with the roofline model.  BUILD"
      ],
      "events": [
        "T1 checkpoint",
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
        "Precision and the anatomy of a matrix multiply",
        "Fewer bits per number mean faster arithmetic and less memory traffic, and a naive matrix multiply leaves most of the GPU idle.  WHY",
        "Compare FP32, FP16, BF16, and FP8, and tile a matrix multiply through shared memory, registers, and tensor cores.  WE WILL",
        "Number formats: range versus precision; mixed precision: low-precision inputs, FP32 accumulation, and loss scaling; naive matmul is memory-bound; tiling; tensor cores and tile shapes.  CONCEPT"
      ],
      "lecture2": [
        "Triton, and one training step end to end",
        "Fast CUDA is hard to write by hand. Triton lets you describe a block of work and leaves coalescing, staging, and tensor cores to the compiler.  WHY",
        "Write a tiled matmul and a fused softmax in Triton, autotune block sizes, and follow one training step from corpus to cluster to SM.  WE WILL",
        "Programs instead of threads; blocks, tl.load, tl.store, masks, and tl.dot; what the compiler does; autotuning; kernel fusion; course synthesis.  CONCEPT",
        "Triton blocks, masks, and reductions; correct timing and tests.  BUILD"
      ],
      "events": [
        "T1 due",
        "Lab 3 due (after Lecture 1)"
      ],
      "block": "training"
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
      "code": "T2",
      "title": "Distributed programming",
      "due": "Due Week 10",
      "date": "2027-03-26",
      "build": "Implement one small CPU all-reduce with mpi4py point-to-point messages; other primitives are provided. Build a torch.distributed/NCCL benchmark for GPU collectives and run a guided two-server case. Test results, rank/device mapping, and operation ordering. Checkpoint: correct collectives on small tensors.",
      "study": "Vary message size, rank count, and topology. Fit latency and bandwidth; compare predictions with measured time and diagnose synchronization or communication limits.",
      "thread": "training"
    },
    {
      "code": "T3",
      "title": "Parallel training systems",
      "due": "Due Week 12",
      "date": "2027-04-09",
      "build": "Implement data-parallel gradient averaging and compare one update with a single-process reference and PyTorch DDP. Train on D3 data. Complete guided tensor- and pipeline-parallel exercises with supplied code and a deeper toy model. Analyze a 3D DP × TP × PP layout using a supplied simulator. Checkpoint: correct DP update and basic layout tests. Full 3D training is optional.",
      "study": "Compare replicated and sharded state, communication volume, pipeline bubbles, and scaling efficiency. State the batch convention; justify a layout under a fixed GPU/memory budget and measure full DP training.",
      "thread": "training"
    },
    {
      "code": "T1",
      "title": "GPU and framework execution",
      "due": "Due Week 14",
      "date": "2027-04-23",
      "build": "Implement one Triton reduction or fused elementwise kernel and validate it against PyTorch. Integrate it into the forward pass of a supplied workload using your D3 dataset; compare PyTorch eager and compiled execution and a guided torch.func.vmap version. Model, autograd, optimizer, and data loader are provided. Checkpoint: correct kernel and timing harness.",
      "study": "Predict memory traffic and arithmetic intensity; vary input and batch size. Separate compile, launch, and steady-state costs; explain the observed bottleneck with a trace.",
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
  "slides": {
    "Week 5": {
      "1": "assets/slides/w05_l1_processes_threads.pdf"
    },
    "Week 6": {
      "1": "assets/slides/w06_l1_networking.pdf",
      "2": "assets/slides/w06_l2_rpc_datacenter.pdf"
    },
    "Week 7": {
      "1": "assets/slides/w07_l1_message_passing.pdf",
      "2": "assets/slides/w07_l2_collectives.pdf"
    },
    "Week 8": {
      "1": "assets/slides/w08_l1_allreduce.pdf",
      "2": "assets/slides/w08_l2_nccl_topology.pdf"
    },
    "Week 9": {
      "1": "assets/slides/w09_l1_data_parallelism.pdf",
      "2": "assets/slides/w09_l2_zero_fsdp.pdf"
    },
    "Week 10": {
      "1": "assets/slides/w10_l1_tensor_parallelism.pdf",
      "2": "assets/slides/w10_l2_pipeline_3d.pdf"
    },
    "Week 11": {
      "1": "assets/slides/w11_l1_matmul_2d.pdf",
      "2": "assets/slides/w11_l2_matmul_3d.pdf"
    },
    "Week 12": {
      "1": "assets/slides/w12_l1_gpu_architecture.pdf",
      "2": "assets/slides/w12_l2_gpu_execution.pdf"
    },
    "Week 13": {
      "1": "assets/slides/w13_l1_memory_hierarchy.pdf",
      "2": "assets/slides/w13_l2_roofline.pdf"
    },
    "Week 14": {
      "1": "assets/slides/w14_l1_precision_matmul.pdf",
      "2": "assets/slides/w14_l2_triton_end_to_end.pdf"
    }
  },
  "assignment_slides": {
    "D1": "assets/assignment-slides/01_d1_collect.pdf",
    "D2": "assets/assignment-slides/02_d2_spark.pdf",
    "D3": "assets/assignment-slides/03_d3_dataset.pdf",
    "T1": "assets/assignment-slides/04_t1_numpy.pdf",
    "T2": "assets/assignment-slides/05_t2_triton.pdf",
    "T3": "assets/assignment-slides/06_t3_scale_out.pdf",
    "Capstone": "assets/assignment-slides/07_capstone.pdf",
    "UI": "assets/assignment-slides/08_ui_dashboard.pdf"
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
      "weeks": "3–4"
    },
    {
      "name": "Lab 3",
      "description": "GPU and framework lab: inspect memory access, write a small Triton kernel, and trace PyTorch eager/compiled execution with a guided torch.func.vmap comparison.",
      "weeks": "12–14"
    },
    {
      "name": "Lab 4",
      "description": "Communication lab: rank/device mapping, CPU messages, NCCL collectives, and a guided two-server run; fit latency and bandwidth.",
      "weeks": "7–9"
    },
    {
      "name": "Lab 5",
      "description": "Parallelism lab: guided tensor and pipeline partitions of a supplied toy model; measure communication and pipeline bubbles; map a 3D layout.",
      "weeks": "10–11"
    }
  ],
  "readings": [
    "Large-scale data processing (Weeks 1–4)",
    "Codd, “A Relational Model of Data for Large Shared Data Banks,” CACM 1970.",
    "Dean and Ghemawat, “MapReduce: Simplified Data Processing on Large Clusters,” OSDI 2004.",
    "Zaharia et al., “Resilient Distributed Datasets: A Fault-Tolerant Abstraction for In-Memory Cluster Computing,” NSDI 2012.",
    "Armbrust et al., “Spark SQL: Relational Data Processing in Spark,” SIGMOD 2015.",
    "Leskovec, Rajaraman, and Ullman, Mining of Massive Datasets, Chapter 3.",
    "Sennrich, Haddow, and Birch, “Neural Machine Translation of Rare Words with Subword Units,” ACL 2016.",
    "Lee et al., “Deduplicating Training Data Makes Language Models Better,” ACL 2022.",
    "Penedo et al., “The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale,” NeurIPS 2024 (Datasets and Benchmarks).",
    "Distributed, ML, and GPU systems (Weeks 5–14)",
    "NVIDIA, CUDA Programming Guide: execution hierarchy, GPU memory, synchronization, and streams. CUDA guide",
    "PyTorch documentation: tensors, operator dispatch, torch.compile, torch.func (vmap), and asynchronous CUDA execution. PyTorch dispatch · Compilation · torch.func",
    "Williams, Waterman, and Patterson, “Roofline: An Insightful Visual Performance Model for Multicore Architectures,” CACM 2009.",
    "Tillet, Kung, and Cox, “Triton: An Intermediate Language and Compiler for Tiled Neural Network Computations,” MAPL 2019.",
    "NVIDIA, NCCL User Guide: collectives, process and device mapping, ordering, and synchronization. PyTorch Distributed Overview: communication primitives and parallel execution. NCCL ordering · Distributed overview",
    "Narayanan et al., “Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM,” SC 2021: composing data, tensor, and pipeline parallelism. Paper",
    "Rajbhandari et al., “ZeRO: Memory Optimizations Toward Training Trillion Parameter Models,” SC 2020.",
    "Bengio et al., “A Neural Probabilistic Language Model,” JMLR 2003, for the supplied workload.",
    "Thakur, Rabenseifner, and Gropp, “Optimization of Collective Communication Operations in MPICH,” IJHPCA 2005, for collective cost models.",
    "van de Geijn and Watts, “SUMMA: Scalable Universal Matrix Multiplication Algorithm,” Concurrency: Practice and Experience 1997, for 2D matrix multiplication.",
    "Agarwal et al., “A Three-Dimensional Approach to Parallel Matrix Multiplication,” IBM Journal of Research and Development 1995, for 3D matrix multiplication."
  ]
};

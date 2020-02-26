@extends('layouts.main')

@section('head-title')All messages @endsection

@section('content')
    <h1>All messages</h1>

    @foreach($data as $contact)
        <div class="alert alert-info">
            <h3>{{ $contact->subject }}</h3>
            <p>{{ $contact->email }}</p>
            <p><small>{{ $contact->created_at }}</small></p>
            <a href="#"><button class="btn btn-warning">View</button></a>
        </div>
    @endforeach
@endsection
